import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

// Remove local ImportMeta typings; they are declared in src/vite-env.d.ts

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const devBypassEnabled = import.meta.env.DEV && import.meta.env.VITE_DEV_ADMIN_BYPASS === 'true';
  const devBypassEmail = (import.meta.env.VITE_DEV_ADMIN_EMAIL as string) || '';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      let admin = false;

      if (user) {
        try {
          // Prefer custom claims for role
          const idTokenResult = await user.getIdTokenResult(true);
          const role = (idTokenResult.claims as any)?.role as string | undefined;
          if (role === 'admin' || role === 'super_admin') {
            admin = true;
          } else {
            // Fallback to Firestore-based role checks
            const adminDoc = await getDoc(doc(db, 'admins', user.uid));
            if (adminDoc.exists()) {
              const adminData = adminDoc.data();
              admin = adminData.role === 'admin' || adminData.role === 'super_admin';
            } else {
              const userDoc = await getDoc(doc(db, 'users', user.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                admin = userData.role === 'admin';
              }
            }
          }
        } catch (error) {
          if (import.meta.env.DEV) console.error('Error checking admin status:', error);
        }

        // Dev bypass as last resort in dev only
        if (!admin && devBypassEnabled && user.email && user.email.toLowerCase() === devBypassEmail.toLowerCase()) {
          if (import.meta.env.DEV) console.warn('[DEV] Admin bypass active for', user.email);
          admin = true;
        }
      }

      setIsAdmin(admin);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Refresh and check custom claims first
      const idTokenResult = await user.getIdTokenResult(true);
      const role = (idTokenResult.claims as any)?.role as string | undefined;
      if (role === 'admin' || role === 'super_admin') {
        return;
      }

      // Fallback: Firestore role docs
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (adminDoc.exists()) {
        const adminData = adminDoc.data();
        if (adminData.role === 'admin' || adminData.role === 'super_admin') return;
      }
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'admin') return;
      }

      // Dev bypass in development
      if (devBypassEnabled && user.email && user.email.toLowerCase() === devBypassEmail.toLowerCase()) {
        if (import.meta.env.DEV) console.warn('[DEV] Admin bypass login for', user.email);
        return;
      }

      await signOut(auth);
      throw new Error('Sign-in not permitted for this application.');
    } catch (error) {
      if (import.meta.env.DEV) console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      if (import.meta.env.DEV) console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    isAdmin,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};