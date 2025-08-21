import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data();
          
          // Check if user has a role and it's 'customer'
          if (!userData || userData.role !== 'customer') {
            // Do not force sign-out; just clear local customer state
            setUser(null);
            setIsLoading(false);
            return;
          }
          
          const user: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || userData?.name || 'User',
            email: firebaseUser.email || '',
            role: 'customer',
            allergies: userData?.allergies || [],
            deliveryAddress: userData?.deliveryAddress || '',
            phoneNumber: userData?.phoneNumber || ''
          };
          
          setUser(user);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // If error, don't force sign out
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Real Firebase login
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Let onAuthStateChanged control isLoading to avoid redirect races
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Check user role after login
      const uid = auth.currentUser!.uid;
      const userDoc = await getDoc(doc(db, 'users', uid));
      const userData = userDoc.data();
      
      if (!userData || userData.role !== 'customer') {
        // Cross-check in cooks collection but return neutral message regardless
        const cookDoc = await getDoc(doc(db, 'cooks', uid));
        cookDoc.data(); // intentionally not used to avoid role-revealing messaging
        await signOut(auth);
        return { 
          success: false, 
          message: 'Sign-in not permitted for this application.' 
        };
      }

      // Set local user immediately to prevent redirect loop
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
    // Let onAuthStateChanged control isLoading to avoid redirect races
    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Update display name
      await updateProfile(firebaseUser, { displayName: name });

      // Create user document in Firestore with customer role
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name: name,
        email: email,
        role: 'customer',
        allergies: [],
        deliveryAddress: '',
        phoneNumber: '',
        createdAt: new Date()
      });

      // Immediately set local user to avoid race where ProtectedRoute redirects before Firestore read completes
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
      // If the email is already in use, attempt to sign in and create the user profile if missing
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
          }
          return { success: true, message: 'Profile created for existing account' };
        } catch (linkErr: any) {
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

  // Real Firebase logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
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