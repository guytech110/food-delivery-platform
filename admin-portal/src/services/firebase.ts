import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User, Cook, Order, MenuItem, Analytics, DashboardMetrics, PlatformSettings } from '../types';

// User Management
export const getUsers = async (): Promise<User[]> => {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    lastLogin: doc.data().lastLogin?.toDate() || new Date(),
  })) as User[];
};

export const getUserById = async (userId: string): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (!userDoc.exists()) return null;
  
  const data = userDoc.data();
  return {
    id: userDoc.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    lastLogin: data.lastLogin?.toDate() || new Date(),
  } as User;
};

export const updateUser = async (userId: string, userData: Partial<User>): Promise<void> => {
  await updateDoc(doc(db, 'users', userId), {
    ...userData,
    updatedAt: Timestamp.now(),
  });
};

// Cook Management
export const getCooks = async (): Promise<Cook[]> => {
  const cooksRef = collection(db, 'cooks');
  const snapshot = await getDocs(cooksRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
  })) as Cook[];
};

export const getCookById = async (cookId: string): Promise<Cook | null> => {
  const cookDoc = await getDoc(doc(db, 'cooks', cookId));
  if (!cookDoc.exists()) return null;
  
  const data = cookDoc.data();
  return {
    id: cookDoc.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  } as Cook;
};

export const updateCookVerification = async (cookId: string, status: 'approved' | 'rejected'): Promise<void> => {
  await updateDoc(doc(db, 'cooks', cookId), {
    verificationStatus: status,
    updatedAt: Timestamp.now(),
  });
};

export const getPendingCookApplications = async (): Promise<Cook[]> => {
  const cooksRef = collection(db, 'cooks');
  const q = query(cooksRef, where('verificationStatus', '==', 'pending'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
  })) as Cook[];
};

// Order Management
export const getOrders = async (): Promise<Order[]> => {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    estimatedDeliveryTime: doc.data().estimatedDeliveryTime?.toDate(),
    actualDeliveryTime: doc.data().actualDeliveryTime?.toDate(),
  })) as Order[];
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const orderDoc = await getDoc(doc(db, 'orders', orderId));
  if (!orderDoc.exists()) return null;
  
  const data = orderDoc.data();
  return {
    id: orderDoc.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
    estimatedDeliveryTime: data.estimatedDeliveryTime?.toDate(),
    actualDeliveryTime: data.actualDeliveryTime?.toDate(),
  } as Order;
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<void> => {
  await updateDoc(doc(db, 'orders', orderId), {
    status,
    updatedAt: Timestamp.now(),
  });
};

export const getRecentOrders = async (limitCount: number = 10): Promise<Order[]> => {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(limitCount));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    estimatedDeliveryTime: doc.data().estimatedDeliveryTime?.toDate(),
    actualDeliveryTime: doc.data().actualDeliveryTime?.toDate(),
  })) as Order[];
};

// Menu Management
export const getMenuItems = async (): Promise<MenuItem[]> => {
  const menuRef = collection(db, 'menus');
  const snapshot = await getDocs(menuRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
  })) as MenuItem[];
};

export const updateMenuItem = async (itemId: string, itemData: Partial<MenuItem>): Promise<void> => {
  await updateDoc(doc(db, 'menus', itemId), {
    ...itemData,
    updatedAt: Timestamp.now(),
  });
};

export const deleteMenuItem = async (itemId: string): Promise<void> => {
  await deleteDoc(doc(db, 'menus', itemId));
};

// Analytics
export const getAnalytics = async (): Promise<Analytics> => {
  // Get all orders for revenue calculation
  const orders = await getOrders();
  const users = await getUsers();
  const cooks = await getCooks();
  
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  
  const thisMonthOrders = orders.filter(order => order.createdAt >= thisMonth);
  const lastMonthOrders = orders.filter(order => 
    order.createdAt >= lastMonth && order.createdAt < thisMonth
  );
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  const customers = users.filter(user => user.role === 'customer');
  const activeCooks = cooks.filter(cook => cook.isActive);
  
  return {
    revenue: {
      total: totalRevenue,
      thisMonth: thisMonthRevenue,
      lastMonth: lastMonthRevenue,
      growth: lastMonthRevenue > 0 ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0,
    },
    orders: {
      total: orders.length,
      thisMonth: thisMonthOrders.length,
      lastMonth: lastMonthOrders.length,
      growth: lastMonthOrders.length > 0 ? ((thisMonthOrders.length - lastMonthOrders.length) / lastMonthOrders.length) * 100 : 0,
    },
    users: {
      total: users.length,
      customers: customers.length,
      cooks: activeCooks.length,
      growth: 0, // Would need historical data for this
    },
    performance: {
      averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
      completionRate: orders.length > 0 ? (orders.filter(o => o.status === 'delivered').length / orders.length) * 100 : 0,
      customerSatisfaction: 4.5, // Would need rating system
    },
  };
};

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  const orders = await getRecentOrders(10);
  const cooks = await getCooks();
  const pendingCooks = await getPendingCookApplications();
  const analytics = await getAnalytics();
  
  const topPerformingCooks = cooks
    .filter(cook => cook.isActive)
    .sort((a, b) => b.performance.rating - a.performance.rating)
    .slice(0, 5);
  
  // Generate chart data for last 7 days
  const labels = [];
  const revenueData = [];
  const orderData = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    const dayOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate.toDateString() === date.toDateString();
    });
    
    revenueData.push(dayOrders.reduce((sum, order) => sum + order.totalAmount, 0));
    orderData.push(dayOrders.length);
  }
  
  return {
    totalRevenue: analytics.revenue.total,
    totalOrders: analytics.orders.total,
    activeUsers: analytics.users.total,
    pendingCookApplications: pendingCooks.length,
    recentOrders: orders,
    topPerformingCooks,
    revenueChart: {
      labels,
      data: revenueData,
    },
    orderStatusChart: {
      labels: ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivering', 'Delivered', 'Cancelled'],
      data: [
        orders.filter(o => o.status === 'pending').length,
        orders.filter(o => o.status === 'confirmed').length,
        orders.filter(o => o.status === 'preparing').length,
        orders.filter(o => o.status === 'ready').length,
        orders.filter(o => o.status === 'delivering').length,
        orders.filter(o => o.status === 'delivered').length,
        orders.filter(o => o.status === 'cancelled').length,
      ],
    },
  };
};

// Real-time listeners
export const subscribeToOrders = (callback: (orders: Order[]) => void) => {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      estimatedDeliveryTime: doc.data().estimatedDeliveryTime?.toDate(),
      actualDeliveryTime: doc.data().actualDeliveryTime?.toDate(),
    })) as Order[];
    
    callback(orders);
  });
};

export const subscribeToCooks = (callback: (cooks: Cook[]) => void) => {
  const cooksRef = collection(db, 'cooks');
  
  return onSnapshot(cooksRef, (snapshot) => {
    const cooks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Cook[];
    
    callback(cooks);
  });
}; 