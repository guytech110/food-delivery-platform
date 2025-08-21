import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'cook';
  allergies?: string[];
  deliveryAddress?: string;
  phoneNumber?: string;
}

// Authentication context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  // diagnostics
  diag: () => AuthDiagnostics;
}

interface AuthDiagnostics {
  user: User | null;
  rawFirebaseUser: string | null;
  isLoading: boolean;
  profileLoading: boolean;
  lastEvents: DebugEvent[];
}

interface DebugEvent { ts: number; type: string; info?: any; }

const eventBuffer: DebugEvent[] = [];
const pushEvent = (type: string, info?: any) => {
  const ev: DebugEvent = { ts: Date.now(), type, info };
  eventBuffer.push(ev);
  if (eventBuffer.length > 200) eventBuffer.shift();
  if (import.meta.env.VITE_ENABLE_AUTH_DEBUG || typeof window !== 'undefined' && window.location.search.includes('forceLog=1')) {
    // eslint-disable-next-line no-console
    console.log('[AuthEvent]', type, info || '');
  }
  // Firestore remote logging (best effort, non-blocking)
  try {
    if (db && (import.meta.env.VITE_ENABLE_REMOTE_DEBUG === '1')) {
      void addDoc(collection(db, 'debugAuthEvents'), {
        type,
        info: JSON.stringify(info ?? {}),
        createdAt: serverTimestamp()
      });
    }
  } catch(_) { /* ignore */ }
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileCreatedFallback, setProfileCreatedFallback] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Helper: sleep for retry backoff
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      pushEvent('onAuthStateChanged', { hasFirebaseUser: !!firebaseUser });
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Provisional user immediately so ProtectedRoute passes
      setUser(prev => prev || {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email || '',
        role: 'customer', // assume customer until proven otherwise
        allergies: [],
        deliveryAddress: '',
        phoneNumber: ''
      });
      setIsLoading(false); // auth layer resolved

      // Fetch / enrich profile separately
      setProfileLoading(true);
      const maxRetries = 10;
      const delayMs = 300;
      let attempt = 0;
      let userData: any | undefined;
      while (attempt < maxRetries) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            userData = userDoc.data();
            break;
          }
        } catch (e) {
          pushEvent('profileFetchError', { attempt, error: String(e) });
        }
        attempt++;
        await sleep(delayMs);
      }
      pushEvent('profileFetchDone', { found: !!userData, attempt });

      if (userData) {
        if (userData.role !== 'customer') {
          pushEvent('roleMismatchSignOut', { role: userData.role });
          await signOut(auth);
          setUser(null);
          setProfileLoading(false);
          return;
        }
        setUser(cur => ({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || userData?.name || cur?.name || 'User',
          email: firebaseUser.email || cur?.email || '',
          role: 'customer',
          allergies: userData?.allergies || cur?.allergies || [],
          deliveryAddress: userData?.deliveryAddress || cur?.deliveryAddress || '',
          phoneNumber: userData?.phoneNumber || cur?.phoneNumber || ''
        }));
      } else {
        pushEvent('profileMissingAfterRetries');
        // Fallback creation (only once per session) to heal failed write in production
        if (!profileCreatedFallback && !profileLoading) {
          try {
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              role: 'customer',
              allergies: [],
              deliveryAddress: '',
              phoneNumber: '',
              createdAt: new Date(),
              healed: true
            }, { merge: true });
            setProfileCreatedFallback(true);
            pushEvent('profileFallbackCreated');
          } catch (e) {
            pushEvent('profileFallbackCreateError', { error: String(e) });
          }
        }
      }
      setProfileLoading(false);
    });
    return () => unsubscribe();
  }, [profileCreatedFallback, profileLoading]);

  // Real Firebase login
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      pushEvent('loginSuccess');
      // Check user role after login
      const uid = auth.currentUser!.uid;
      const userDoc = await getDoc(doc(db, 'users', uid));
      const userData = userDoc.data();

      if (!userData || userData.role !== 'customer') {
        const cookDoc = await getDoc(doc(db, 'cooks', uid));
        cookDoc.data();
        await signOut(auth);
        pushEvent('loginRoleRejected');
        return { 
          success: false, 
          message: 'Sign-in not permitted for this application.' 
        };
      }

      const current = auth.currentUser!;
      setUser({
        id: current.uid,
        name: current.displayName || userData?.name || 'User',
        email: current.email || '',
        role: 'customer',
        allergies: userData?.allergies || [],
        deliveryAddress: userData?.deliveryAddress || '',
        phoneNumber: userData?.phoneNumber || ''
      });

      return { success: true, message: 'Login successful' };
    } catch (error: any) {
      pushEvent('loginError', { code: error?.code });
      let message = 'Login failed';
      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      }
      return { success: false, message };
    }
  };

  // Real Firebase signup
  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      pushEvent('signupAuthCreated', { uid: firebaseUser.uid });

      await updateProfile(firebaseUser, { displayName: name });

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name: name,
        email: email,
        role: 'customer',
        allergies: [],
        deliveryAddress: '',
        phoneNumber: '',
        createdAt: new Date()
      });
      pushEvent('signupProfileCreated');

      setUser({
        id: firebaseUser.uid,
        name: name,
        email: email,
        role: 'customer',
        allergies: [],
        deliveryAddress: '',
        phoneNumber: ''
      });

      return { success: true, message: 'Account created successfully' };
    } catch (error: any) {
      pushEvent('signupError', { code: error?.code });
      if (error?.code === 'auth/email-already-in-use') {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          const uid = auth.currentUser!.uid;
          const existingUserDoc = await getDoc(doc(db, 'users', uid));
          if (!existingUserDoc.exists()) {
            await setDoc(doc(db, 'users', uid), {
              name,
              email,
              role: 'customer',
              allergies: [],
              deliveryAddress: '',
              phoneNumber: '',
              createdAt: new Date()
            });
            pushEvent('existingAccountProfileCreated');
          }
          return { success: true, message: 'Profile created for existing account' };
        } catch (linkErr: any) {
          pushEvent('existingAccountLinkError', { code: linkErr?.code });
          const msg = linkErr?.code === 'auth/wrong-password' ? 'Email already in use. Please use the correct password for this account.' : 'Could not create profile for existing account.';
          return { success: false, message: msg };
        }
      }

      let message = 'Signup failed';
      if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      }
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      pushEvent('logout');
    } catch (error) {
      pushEvent('logoutError', { error: String(error) });
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (user && auth.currentUser) {
      try {
        await setDoc(doc(db, 'users', user.id), userData, { merge: true });
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        pushEvent('userUpdated', { keys: Object.keys(userData) });
      } catch (error) {
        pushEvent('userUpdateError', { error: String(error) });
      }
    }
  };

  const diag = (): AuthDiagnostics => ({
    user,
    rawFirebaseUser: auth.currentUser ? auth.currentUser.uid : null,
    isLoading,
    profileLoading,
    lastEvents: [...eventBuffer.slice(-50)]
  });

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading: isLoading || profileLoading,
    login,
    signup,
    logout,
    updateUser,
    diag
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};