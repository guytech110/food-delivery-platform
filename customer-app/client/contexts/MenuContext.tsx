import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Menu item interface
export interface MenuItem {
  id: string;
  cookId: string;
  cookName: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  preparationTime?: number; // in minutes
  allergens?: string[];
  ingredients?: string[];
  rating?: number; // Optional rating for the menu item
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Menu context interface
interface MenuContextType {
  // Menu items
  menuItems: MenuItem[];
  isLoading: boolean;
  
  // Actions
  getAllMenuItems: () => Promise<MenuItem[]>;
  getMenuItemsByCook: (cookId: string) => Promise<MenuItem[]>;
  getMenuItemById: (menuItemId: string) => Promise<MenuItem | null>;
  
  // Real-time listeners
  subscribeToAllMenus: () => () => void;
}

// Create the context
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Provider component
interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get all menu items
  const getAllMenuItems = async (): Promise<MenuItem[]> => {
    try {
      const q = query(
        collection(db, 'menuItems'),
        where('isAvailable', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
    } catch (error) {
      console.error('Error fetching all menu items:', error);
      return [];
    }
  };

  // Get menu items by cook
  const getMenuItemsByCook = async (cookId: string): Promise<MenuItem[]> => {
    try {
      const q = query(
        collection(db, 'menuItems'),
        where('cookId', '==', cookId),
        where('isAvailable', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
    } catch (error) {
      console.error('Error fetching cook menu items:', error);
      return [];
    }
  };

  // Get menu item by ID
  const getMenuItemById = async (menuItemId: string): Promise<MenuItem | null> => {
    try {
      const menuItemDoc = await getDocs(query(
        collection(db, 'menuItems'),
        where('__name__', '==', menuItemId)
      ));
      
      if (!menuItemDoc.empty) {
        const doc = menuItemDoc.docs[0];
        return {
          id: doc.id,
          ...doc.data()
        } as MenuItem;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching menu item:', error);
      return null;
    }
  };

  // Subscribe to all menus (real-time)
  const subscribeToAllMenus = useCallback(() => {
    // Simplified query to avoid index issues - we'll filter client-side
    const q = query(
      collection(db, 'menuItems')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allMenuItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      
      // Filter available items client-side and sort by createdAt
      const availableItems = allMenuItems
        .filter(item => item.isAvailable === true)
        .sort((a, b) => {
          // Sort by createdAt descending (newest first)
          const aTime = a.createdAt?.toDate?.() || new Date(0);
          const bTime = b.createdAt?.toDate?.() || new Date(0);
          return bTime.getTime() - aTime.getTime();
        });
      
      setMenuItems(availableItems);
    });

    return unsubscribe;
  }, []);

  const value = {
    menuItems,
    isLoading,
    getAllMenuItems,
    getMenuItemsByCook,
    getMenuItemById,
    subscribeToAllMenus
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}; 