import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
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
  const provisioningRef = useRef(false); // tracks initial provisioning

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      console.log('[Auth] onAuthStateChanged fired', { uid: firebaseUser?.uid });
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          console.log('[Auth] userDoc exists?', userDoc.exists());
          const userData = userDoc.data();
          console.log('[Auth] userData', userData);
          if (!userDoc.exists()) {
            console.log('[Auth] provisioning new user doc');
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
          console.log('[Auth] finalData after provisioning', finalData);
          if (finalData && finalData.role && finalData.role !== 'customer') {
            console.log('[Auth] role mismatch -> signOut');
            await signOut(auth);
            setUser(null);
            setIsLoading(false);
            provisioningRef.current = false;
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
          console.log('[Auth] setting user state', mergedUser);
          setUser(mergedUser);
          provisioningRef.current = false;
        } catch (error) {
          console.error('Error fetching/provisioning user data:', error);
          if (firebaseUser) {
            console.log('[Auth] fallback basic user');
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              role: 'customer'
            });
          }
        }
      } else {
        console.log('[Auth] firebaseUser null -> clearing user');
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Real Firebase login
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
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
    setIsLoading(true);
    
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