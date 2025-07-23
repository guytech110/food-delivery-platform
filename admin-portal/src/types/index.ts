// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'cook' | 'admin';
  phoneNumber?: string;
  deliveryAddress?: string;
  allergies?: string[];
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
}

// Cook types
export interface Cook {
  id: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  kycData?: {
    identityVerified: boolean;
    kitchenVerified: boolean;
    selfieVerified: boolean;
    documents: string[];
  };
  earnings: {
    total: number;
    thisMonth: number;
    lastMonth: number;
  };
  performance: {
    rating: number;
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Order types
export interface Order {
  id: string;
  customerId: string;
  cookId: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  totalAmount: number;
  deliveryAddress: string;
  deliveryFee: number;
  tax: number;
  subtotal: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

// Menu types
export interface MenuItem {
  id: string;
  cookId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  allergens?: string[];
  preparationTime: number;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics types
export interface Analytics {
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  orders: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  users: {
    total: number;
    customers: number;
    cooks: number;
    growth: number;
  };
  performance: {
    averageOrderValue: number;
    completionRate: number;
    customerSatisfaction: number;
  };
}

// Dashboard metrics
export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  activeUsers: number;
  pendingCookApplications: number;
  recentOrders: Order[];
  topPerformingCooks: Cook[];
  revenueChart: {
    labels: string[];
    data: number[];
  };
  orderStatusChart: {
    labels: string[];
    data: number[];
  };
}

// Settings types
export interface PlatformSettings {
  deliveryFee: number;
  taxRate: number;
  minimumOrderAmount: number;
  maxDeliveryDistance: number;
  autoApproveCooks: boolean;
  requireKYC: boolean;
  maintenanceMode: boolean;
} 