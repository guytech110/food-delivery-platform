import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem } from './MenuContext';

// Cart item interface
export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  specialInstructions?: string;
}

// Cart context interface
interface CartContextType {
  items: CartItem[];
  addToCart: (menuItem: MenuItem, restaurantId: string, restaurantName: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  getRestaurantId: () => string | null;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on app start
  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Add item to cart
  const addToCart = (menuItem: MenuItem, restaurantId: string, restaurantName: string, quantity: number = 1) => {
    setItems(prevItems => {
      // Check if cart is empty or if item is from the same restaurant
      if (prevItems.length === 0 || prevItems[0].restaurantId === restaurantId) {
        // Check if item already exists in cart
        const existingItemIndex = prevItems.findIndex(item => item.id === menuItem.id);
        
        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          return updatedItems;
        } else {
          // Add new item
          const newItem: CartItem = {
            id: menuItem.id,
            menuItem,
            quantity,
            restaurantId,
            restaurantName
          };
          return [...prevItems, newItem];
        }
      } else {
        // Different restaurant - clear cart and add new item
        const newItem: CartItem = {
          id: menuItem.id,
          menuItem,
          quantity,
          restaurantId,
          restaurantName
        };
        return [newItem];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setItems([]);
  };

  // Get total number of items
  const getTotalItems = (): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Get subtotal (before delivery fee)
  const getSubtotal = (): number => {
    return items.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  };

  // Get delivery fee (mock calculation)
  const getDeliveryFee = (): number => {
    if (items.length === 0) return 0;
    
    const subtotal = getSubtotal();
    // Free delivery for orders over $25
    if (subtotal >= 25) return 0;
    
    // Standard delivery fee
    return 3.99;
  };

  // Get total (subtotal + delivery fee)
  const getTotal = (): number => {
    return getSubtotal() + getDeliveryFee();
  };

  // Get restaurant ID (all items should be from same restaurant)
  const getRestaurantId = (): string | null => {
    if (items.length === 0) return null;
    return items[0].restaurantId;
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
    getDeliveryFee,
    getTotal,
    getRestaurantId
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 