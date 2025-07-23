import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

// Menu item interface
export interface MenuItem {
  id: string;
  cookId: string;
  cookName?: string; // Optional for backward compatibility
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  preparationTime?: number; // in minutes
  allergens?: string[];
  ingredients?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Menu context interface
interface MenuContextType {
  // Menu items
  menuItems: MenuItem[];
  cookMenuItems: MenuItem[];
  isLoading: boolean;
  
  // Actions
  createMenuItem: (menuItemData: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean; menuItemId?: string; message: string }>;
  updateMenuItem: (menuItemId: string, menuItemData: Partial<MenuItem>) => Promise<{ success: boolean; message: string }>;
  deleteMenuItem: (menuItemId: string) => Promise<{ success: boolean; message: string }>;
  getMenuItemsByCook: (cookId: string) => Promise<MenuItem[]>;
  getAllMenuItems: () => Promise<MenuItem[]>;
  getMenuItemById: (menuItemId: string) => Promise<MenuItem | null>;
  
  // Real-time listeners
  subscribeToCookMenu: (cookId: string) => () => void;
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
  const [cookMenuItems, setCookMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { cook } = useAuth();

  // Create a new menu item
  const createMenuItem = async (menuItemData: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; menuItemId?: string; message: string }> => {
    setIsLoading(true);
    
    try {
      const menuItemDoc = await addDoc(collection(db, 'menuItems'), {
        ...menuItemData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return { 
        success: true, 
        menuItemId: menuItemDoc.id, 
        message: 'Menu item created successfully' 
      };
    } catch (error) {
      console.error('Error creating menu item:', error);
      return { 
        success: false, 
        message: 'Failed to create menu item' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Update menu item
  const updateMenuItem = async (menuItemId: string, menuItemData: Partial<MenuItem>): Promise<{ success: boolean; message: string }> => {
    try {
      await updateDoc(doc(db, 'menuItems', menuItemId), {
        ...menuItemData,
        updatedAt: serverTimestamp()
      });

      return { success: true, message: 'Menu item updated successfully' };
    } catch (error) {
      console.error('Error updating menu item:', error);
      return { success: false, message: 'Failed to update menu item' };
    }
  };

  // Delete menu item
  const deleteMenuItem = async (menuItemId: string): Promise<{ success: boolean; message: string }> => {
    try {
      await deleteDoc(doc(db, 'menuItems', menuItemId));
      return { success: true, message: 'Menu item deleted successfully' };
    } catch (error) {
      console.error('Error deleting menu item:', error);
      return { success: false, message: 'Failed to delete menu item' };
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

  // Subscribe to cook menu (real-time)
  const subscribeToCookMenu = useCallback((cookId: string) => {
    // Simplified query to avoid index issues - we'll filter client-side
    const q = query(
      collection(db, 'menuItems')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allMenuItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      
      // Filter by cookId client-side
      const cookMenuItems = allMenuItems.filter(item => item.cookId === cookId);
      
      setCookMenuItems(cookMenuItems);
    });

    return unsubscribe;
  }, []);

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
    cookMenuItems,
    isLoading,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getMenuItemsByCook,
    getAllMenuItems,
    getMenuItemById,
    subscribeToCookMenu,
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