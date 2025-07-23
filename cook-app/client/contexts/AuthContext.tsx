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

// Cook interface
export interface Cook {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'cook';
  cuisineSpecialty?: string;
  experience?: string;
  location?: string;
  priceRange?: string;
  isVerified?: boolean | undefined;
  phoneNumber?: string;
  // Onboarding status
  applicationCompleted?: boolean | undefined;
  onboardingCompleted?: boolean;
}

// Authentication context interface
interface AuthContextType {
  cook: Cook | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateCook: (cookData: Partial<Cook>) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cook, setCook] = useState<Cook | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if cook is authenticated
  const isAuthenticated = !!cook;

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Get additional cook data from Firestore
        try {
          const cookDoc = await getDoc(doc(db, 'cooks', firebaseUser.uid));
          const cookData = cookDoc.data();
          
          // Check if user has a role and it's 'cook'
          if (!cookData || cookData.role !== 'cook') {
            // User is not a cook, sign them out
            await signOut(auth);
            setCook(null);
            setIsLoading(false);
            return;
          }
          
          const cook: Cook = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || cookData?.name || 'Cook',
            email: firebaseUser.email || '',
            role: 'cook',
            cuisineSpecialty: cookData?.cuisineSpecialty || '',
            experience: cookData?.experience || '',
            location: cookData?.location || '',
            priceRange: cookData?.priceRange || '',
            isVerified: cookData?.isVerified ?? false, // Default to false if undefined
            phoneNumber: cookData?.phoneNumber || '',
            applicationCompleted: cookData?.applicationCompleted ?? false, // Default to false if undefined
            onboardingCompleted: cookData?.onboardingCompleted || false,
          };
          setCook(cook);
        } catch (error) {
          console.error('Error fetching cook data:', error);
          // If error, sign out the user
          await signOut(auth);
          setCook(null);
        }
      } else {
        setCook(null);
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
      
      // Check user role after login
      const cookDoc = await getDoc(doc(db, 'cooks', auth.currentUser!.uid));
      const cookData = cookDoc.data();
      
      if (!cookData || cookData.role !== 'cook') {
        await signOut(auth);
        return { 
          success: false, 
          message: 'This account is for customers. Please use the customer app to login.' 
        };
      }
      
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

      // Create cook document in Firestore with cook role
      await setDoc(doc(db, 'cooks', firebaseUser.uid), {
        name: name,
        email: email,
        role: 'cook',
        cuisineSpecialty: '',
        experience: '',
        location: '',
        priceRange: '',
        isVerified: false,
        phoneNumber: '',
        applicationCompleted: false,
        onboardingCompleted: false,
        createdAt: new Date()
      });

      // Manually set the cook state since onAuthStateChanged might not trigger immediately
      const cook: Cook = {
        id: firebaseUser.uid,
        name: name,
        email: email,
        role: 'cook',
        cuisineSpecialty: '',
        experience: '',
        location: '',
        priceRange: '',
        isVerified: false,
        phoneNumber: '',
        applicationCompleted: false,
        onboardingCompleted: false
      };
      setCook(cook);

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

  // Update cook function
  const updateCook = async (cookData: Partial<Cook>) => {
    if (!cook) return;
    
    try {
      const cookRef = doc(db, 'cooks', cook.id);
      await setDoc(cookRef, cookData, { merge: true });
      
      // Update local state immediately
      const updatedCook = { ...cook, ...cookData };
      setCook(updatedCook);
    } catch (error) {
      console.error('Error updating cook:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    cook,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateCook,
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