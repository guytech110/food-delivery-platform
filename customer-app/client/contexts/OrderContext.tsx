import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
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
import { NotificationType } from './NotificationContext';

// Order interfaces
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  cookId: string;
  cookName: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'accepted' | 'cooking' | 'ready' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  deliveryInstructions?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  estimatedDeliveryTime?: Timestamp;
  actualDeliveryTime?: Timestamp;
}

// Order context interface
interface OrderContextType {
  // Orders
  orders: Order[];
  customerOrders: Order[];
  isLoading: boolean;
  
  // Actions
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean; orderId?: string; message: string }>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<{ success: boolean; message: string }>;
  updatePaymentStatus: (orderId: string, paymentStatus: Order['paymentStatus']) => Promise<{ success: boolean; message: string }>;
  getOrdersByCustomer: (customerId: string) => Promise<Order[]>;
  getOrderById: (orderId: string) => Promise<Order | null>;
  
  // Real-time listeners
  subscribeToCustomerOrders: (customerId: string) => () => void;
}

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Provider component
interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Helper function to send notifications
  const sendNotification = async (notification: {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    orderId?: string;
    cookId?: string;
    cookName?: string;
    customerId?: string;
    customerName?: string;
  }) => {
    try {
      await addDoc(collection(db, 'notifications'), {
        ...notification,
        isRead: false,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  // Create a new order
  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; orderId?: string; message: string }> => {
    setIsLoading(true);
    
    try {
      const orderDoc = await addDoc(collection(db, 'orders'), {
        ...orderData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const orderId = orderDoc.id;

      // Send notification to cook about new order
      await sendNotification({
        userId: orderData.cookId,
        type: NotificationType.NEW_ORDER,
        title: 'New Order Received!',
        message: `You have a new order from ${orderData.customerName} for $${orderData.total.toFixed(2)}`,
        orderId,
        cookId: orderData.cookId,
        cookName: orderData.cookName,
        customerId: orderData.customerId,
        customerName: orderData.customerName
      });

      console.log('Customer App - Order created with cookId:', orderData.cookId);
      console.log('Customer App - Order created with cookName:', orderData.cookName);

      // Send notification to customer about order confirmation
      await sendNotification({
        userId: orderData.customerId,
        type: NotificationType.ORDER_STATUS,
        title: 'Order Confirmed!',
        message: `Your order has been placed successfully. Order #${orderId.slice(-6)}`,
        orderId,
        cookId: orderData.cookId,
        cookName: orderData.cookName,
        customerId: orderData.customerId,
        customerName: orderData.customerName
      });

      return { 
        success: true, 
        orderId, 
        message: 'Order created successfully' 
      };
    } catch (error) {
      console.error('Error creating order:', error);
      return { 
        success: false, 
        message: 'Failed to create order' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<{ success: boolean; message: string }> => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status,
        updatedAt: serverTimestamp()
      });

      // Get order details to send notifications
      const orderDoc = await getDocs(query(collection(db, 'orders'), where('__name__', '==', orderId)));
      if (!orderDoc.empty) {
        const order = orderDoc.docs[0].data() as Order;
        
        // Send notification to customer about status change
        const statusMessages = {
          'accepted': 'Your order has been accepted and is being prepared!',
          'cooking': 'Your order is now being cooked!',
          'ready': 'Your order is ready for pickup/delivery!',
          'delivered': 'Your order has been delivered. Enjoy your meal!',
          'cancelled': 'Your order has been cancelled.'
        };

        const message = statusMessages[status] || `Your order status has been updated to: ${status}`;

        await sendNotification({
          userId: order.customerId,
          type: NotificationType.ORDER_STATUS,
          title: `Order ${status.charAt(0).toUpperCase() + status.slice(1)}`,
          message,
          orderId,
          cookId: order.cookId,
          cookName: order.cookName,
          customerId: order.customerId,
          customerName: order.customerName
        });
      }

      return { success: true, message: 'Order status updated successfully' };
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, message: 'Failed to update order status' };
    }
  };

  // Update payment status
  const updatePaymentStatus = async (orderId: string, paymentStatus: Order['paymentStatus']): Promise<{ success: boolean; message: string }> => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        paymentStatus,
        updatedAt: serverTimestamp()
      });

      return { success: true, message: 'Payment status updated successfully' };
    } catch (error) {
      console.error('Error updating payment status:', error);
      return { success: false, message: 'Failed to update payment status' };
    }
  };

  // Get orders by customer
  const getOrdersByCustomer = async (customerId: string): Promise<Order[]> => {
    try {
      const q = query(
        collection(db, 'orders'),
        where('customerId', '==', customerId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      return [];
    }
  };

  // Get order by ID
  const getOrderById = async (orderId: string): Promise<Order | null> => {
    try {
      const orderDoc = await getDocs(query(
        collection(db, 'orders'),
        where('__name__', '==', orderId)
      ));
      
      if (!orderDoc.empty) {
        const doc = orderDoc.docs[0];
        return {
          id: doc.id,
          ...doc.data()
        } as Order;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  };

  // Subscribe to customer orders (real-time)
  const subscribeToCustomerOrders = (customerId: string) => {
    const q = query(
      collection(db, 'orders'),
      where('customerId', '==', customerId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      
      setCustomerOrders(orders);
    });

    return unsubscribe;
  };

  const value = {
    orders,
    customerOrders,
    isLoading,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
    getOrdersByCustomer,
    getOrderById,
    subscribeToCustomerOrders
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}; 