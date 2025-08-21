import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  deleteUser
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
  // Application data for admin review
  applicationData?: any;
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
            // Do not force sign-out here; just consider unauthenticated in UI
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
          // If error, don't force signout
          setCook(null);
        }
      } else {
        setCook(null);
      }
      setIsLoading(false); // only flip false after auth callback finishes fetching profile
    });

    return () => unsubscribe();
  }, []);

  // Real Firebase login
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Role checks remain; do NOT set isLoading(false) here on success – wait for onAuthStateChanged
      const uid = auth.currentUser!.uid;
      const cookDoc = await getDoc(doc(db, 'cooks', uid));
      const cookData = cookDoc.data();
      if (!cookData || cookData.role !== 'cook') {
        const userDoc = await getDoc(doc(db, 'users', uid));
        userDoc.data();
        await signOut(auth);
        // No auth state change to an authenticated cook; onAuthStateChanged will fire (user signed out) so allow it to flip loading false.
        return { success: false, message: 'Sign-in not permitted for this application.' };
      }
      return { success: true, message: 'Login successful' };
    } catch (error: any) {
      // Failed login will NOT trigger onAuthStateChanged; safe to end loading here
      setIsLoading(false);
      let message = 'Login failed';
      if (error.code === 'auth/user-not-found') message = 'No account found with this email';
      else if (error.code === 'auth/wrong-password') message = 'Incorrect password';
      else if (error.code === 'auth/invalid-email') message = 'Invalid email address';
      return { success: false, message };
    }
  };

  // Real Firebase signup
  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      try {
        await updateProfile(firebaseUser, { displayName: name });
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
      } catch (profileErr: any) {
        try { await deleteUser(firebaseUser); } catch {}
        throw profileErr;
      }
      // Manually set local state (ok) but keep loading true until onAuthStateChanged fires
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
      // Error paths that do NOT produce a successful auth state change must clear loading here
      if (error?.code === 'auth/email-already-in-use') {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          const uid = auth.currentUser!.uid;
          const existingCookDoc = await getDoc(doc(db, 'cooks', uid));
          if (!existingCookDoc.exists()) {
            await setDoc(doc(db, 'cooks', uid), {
              name,
              email,
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
          }
          setCook({
            id: uid,
            name,
            email,
            role: 'cook',
            cuisineSpecialty: '',
            experience: '',
            location: '',
            priceRange: '',
            isVerified: false,
            phoneNumber: '',
            applicationCompleted: false,
            onboardingCompleted: false,
          });
          // Successful sign-in -> onAuthStateChanged will flip loading false
          return { success: true, message: 'Profile created for existing account' };
        } catch (linkErr: any) {
          setIsLoading(false); // failed path
          const msg = linkErr?.code === 'auth/wrong-password' ? 'Email already in use. Please use the correct password for this account.' : 'Could not create profile for existing account.';
          return { success: false, message: msg };
        }
      }
      setIsLoading(false); // generic failure
      let message = 'Signup failed';
      if (error.code === 'auth/weak-password') message = 'Password should be at least 6 characters';
      else if (error.code === 'auth/invalid-email') message = 'Invalid email address';
      else if (error.code === 'permission-denied') message = 'Permission denied creating profile. Please contact support.';
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