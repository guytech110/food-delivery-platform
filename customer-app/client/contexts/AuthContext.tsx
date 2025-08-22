import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

// Added early execution marker
if (typeof window !== 'undefined') {
  // @ts-ignore
  (window as any).__AUTH_CONTEXT_FILE_LOADED__ = (window as any).__AUTH_CONTEXT_FILE_LOADED__ ? (window as any).__AUTH_CONTEXT_FILE_LOADED__ + 1 : 1;
  const _fileLoadAuthDebug = /authdebug=1/.test(window.location.search);
  const _fileLoadLog = (...a: any[]) => { if (_fileLoadAuthDebug) (window as any).__ORIG_CONSOLE_LOG__ ? (window as any).__ORIG_CONSOLE_LOG__.apply(console, ['[Auth][FileLoad]'].concat(a)) : console.log('[Auth][FileLoad]', ...a); };
  _fileLoadLog('AuthContext module evaluated count=', (window as any).__AUTH_CONTEXT_FILE_LOADED__, 'at', new Date().toISOString());
}

// Global debug helpers (used across handlers)
const authDebug = typeof window !== 'undefined' && /authdebug=1/.test(typeof window !== 'undefined' ? window.location.search : '');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dbg = (...a: any[]) => { if (authDebug) ((window as any).__ORIG_CONSOLE_LOG__ || console.log).apply(console, ['[Auth]'].concat(a)); };

import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { clearAuthBypass } from '../lib/authBypass';

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
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const provisioningRef = useRef(false); // tracks initial provisioning

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Listen for Firebase auth state changes
  useEffect(() => {
    dbg('[EffectSetup] registering onAuthStateChanged listener');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      // Top-level instrumentation
      console.log('[auth] onAuthStateChanged fired', { uid: firebaseUser?.uid || null });
      dbg('onAuthStateChanged fired', { uid: firebaseUser?.uid });
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          dbg('userDoc exists?', userDoc.exists());
          const userData = userDoc.data();
            dbg('userData', userData);
          if (!userDoc.exists()) {
            dbg('provisioning new user doc');
            provisioningRef.current = true;
            await setDoc(userDocRef, {
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              role: 'customer',
              allergies: [],
              deliveryAddress: '',
              phoneNumber: '',
              createdAt: new Date()
            });
          }
          const finalDoc = provisioningRef.current ? await getDoc(userDocRef) : userDoc;
          const finalData = finalDoc.data();
          dbg('finalData after provisioning', finalData);
          if (finalData && finalData.role && finalData.role !== 'customer') {
            dbg('role mismatch -> signOut');
            await signOut(auth);
            setUser(null);
            setIsLoading(false);
            provisioningRef.current = false;
            // Log and exit early
            console.log('[auth] state', { authReady: true, isLoading: false, user: false });
            return;
          }
          const mergedUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || finalData?.name || 'User',
            email: firebaseUser.email || finalData?.email || '',
            role: 'customer',
            allergies: finalData?.allergies || [],
            deliveryAddress: finalData?.deliveryAddress || '',
            phoneNumber: finalData?.phoneNumber || ''
          };
          dbg('setting user state', mergedUser);
          setUser(mergedUser);
          provisioningRef.current = false;
        } catch (error) {
          ((window as any).__ORIG_CONSOLE_LOG__ || console.error).call(console, 'Error fetching/provisioning user data:', error);
          if (firebaseUser) {
            dbg('fallback basic user');
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              role: 'customer'
            });
          }
        }
      } else {
        dbg('firebaseUser null -> clearing user');
        setUser(null);
      }
      setIsLoading(false);
      // Bottom-level instrumentation
      try {
        const authReady = true;
        console.log('[auth] state', { authReady, isLoading: false, user: !!(firebaseUser) });
      } catch (e) {
        console.error('[auth] state log failed', e);
      }
    });
    return () => {
      dbg('[EffectCleanup] unmounting auth listener');
      unsubscribe();
    };
  }, []);

  // Real Firebase login
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    if (authDebug) dbg('login() called', { email });
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // After sign in, defer role enforcement to onAuthStateChanged (avoid duplicate fetch & race)
      return { success: true, message: 'Login successful' };
    } catch (error: any) {
      let message = 'Login failed';
      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      }
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Real Firebase signup
  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    if (authDebug) dbg('signup() called', { email });
    setIsLoading(true);
    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      console.log('[signup] created', { uid: firebaseUser.uid, email });

      // Update display name
      await updateProfile(firebaseUser, { displayName: name });

      // Create user document in Firestore with customer role
      try {
        console.log('[signup] writing user doc', { uid: firebaseUser.uid });
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          name: name,
          email: email,
          role: 'customer',
          allergies: [],
          deliveryAddress: '',
          phoneNumber: '',
          createdAt: new Date()
        });
        console.log('[signup] user doc written');
      } catch (e) {
        console.error('[signup] setDoc failed', e);
      }

      // Set a minimal local user so UI can proceed immediately
      try {
        const localUser: User = {
          id: firebaseUser.uid,
          name,
          email,
          role: 'customer'
        };
        setUser(localUser);
        console.log('[signup] local user set');
      } catch (e) {
        console.error('[signup] setUser failed', e);
      }

      // Navigate to a protected onboarding page instead of /login
      if (typeof window !== 'undefined') {
        window.location.assign('/allergy-selection');
      }

      if (authDebug) dbg('signup provisioning complete, redirect should follow in page logic');
      return { success: true, message: 'Account created successfully' };
    } catch (error: any) {
      let message = 'Signup failed';
      if (error.code === 'auth/email-already-in-use') {
        message = 'An account with this email already exists';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      }
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Real Firebase logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('[logout] signOut failed', e);
    } finally {
      setUser(null);
      try { clearAuthBypass?.(); } catch {}
      if (typeof window !== 'undefined') window.location.assign('/login');
    }
  };

  // Update user function
  const updateUser = async (userData: Partial<User>) => {
    if (user && auth.currentUser) {
      try {
        // Update in Firestore
        await setDoc(doc(db, 'users', user.id), userData, { merge: true });
        
        // Update local state
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};