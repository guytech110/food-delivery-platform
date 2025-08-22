import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

// Notification types
export enum NotificationType {
  ORDER_STATUS = 'order_status',
  NEW_ORDER = 'new_order',
  CHAT_MESSAGE = 'chat_message',
  SYSTEM = 'system'
}

// Notification interface
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  orderId?: string;
  cookId?: string;
  cookName?: string;
  customerId?: string;
  customerName?: string;
  isRead: boolean;
  createdAt: Timestamp;
  data?: any; // Additional data for specific notification types
}

// Chat message interface
export interface ChatMessage {
  id: string;
  orderId: string;
  senderId: string;
  senderName: string;
  senderType: 'customer' | 'cook';
  message: string;
  createdAt: Timestamp;
}

// Notification context interface
interface NotificationContextType {
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  
  // Chat messages
  chatMessages: ChatMessage[];
  
  // Actions
  sendNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  
  // Chat actions
  sendChatMessage: (orderId: string, message: string, senderType: 'customer' | 'cook') => Promise<void>;
  
  // Real-time listeners
  subscribeToNotifications: (userId: string) => () => void;
  subscribeToChat: (orderId: string) => () => void;
  
  // Push notifications
  requestNotificationPermission: () => Promise<boolean>;
  sendPushNotification: (title: string, message: string) => void;
}

// Create the context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider component
interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const { user } = useAuth();

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Send notification
  const sendNotification = async (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
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

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      // Update local state immediately for better UX
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
      );
      
      // TODO: Update in Firebase (we'll implement this when we add update functionality)
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      // TODO: Update in Firebase
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId: string) => {
    try {
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      // TODO: Delete from Firebase
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Send chat message
  const sendChatMessage = async (orderId: string, message: string, senderType: 'customer' | 'cook') => {
    if (!user) return;

    try {
      const chatMessage = {
        orderId,
        senderId: user.id,
        senderName: user.name || user.email || 'Unknown',
        senderType,
        message,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'chatMessages'), chatMessage);
      
      // Also send a notification to the other party
      const notificationData = {
        userId: senderType === 'customer' ? 'cook' : 'customer', // This will be filtered by the recipient
        type: NotificationType.CHAT_MESSAGE,
        title: 'New Message',
        message: `${chatMessage.senderName}: ${message}`,
        orderId,
        data: { senderType, senderName: chatMessage.senderName }
      };

      await sendNotification(notificationData);
    } catch (error) {
      console.error('Error sending chat message:', error);
    }
  };

  // Subscribe to notifications
  const subscribeToNotifications = useCallback((userId: string) => {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notifications = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];
      
      setNotifications(notifications);
    });

    return unsubscribe;
  }, []);

  // Subscribe to chat messages
  const subscribeToChat = useCallback((orderId: string) => {
    const q = query(
      collection(db, 'chatMessages'),
      where('orderId', '==', orderId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
      
      setChatMessages(messages);
    });

    return unsubscribe;
  }, []);

  // Request notification permission
  const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      console.log('Notification permission denied');
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  };

  // Send push notification
  const sendPushNotification = (title: string, message: string) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    }
  };

  const value = {
    notifications,
    unreadCount,
    chatMessages,
    sendNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    sendChatMessage,
    subscribeToNotifications,
    subscribeToChat,
    requestNotificationPermission,
    sendPushNotification
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}; 