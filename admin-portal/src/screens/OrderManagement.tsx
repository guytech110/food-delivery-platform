import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Order } from '../types';

interface DisplayOrder {
  id: string;
  customer: {
    name: string;
    initials: string;
    phone: string;
  };
  cook: {
    name: string;
    initials: string;
    phone: string;
  };
  items: string[];
  total: string;
  status: string;
  date: string;
}

export function OrderManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [orders, setOrders] = useState<DisplayOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    inProgressOrders: 0,
    completedOrders: 0
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, orderBy('createdAt', 'desc'));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const ordersData: DisplayOrder[] = [];
          let totalOrders = 0;
          let pendingOrders = 0;
          let inProgressOrders = 0;
          let completedOrders = 0;

          snapshot.forEach((doc) => {
            const orderData = doc.data() as any;
            const order: DisplayOrder = {
              id: doc.id,
      customer: {
                name: 'Customer', // We'll need to fetch customer details separately
                initials: 'CU',
                phone: 'No phone'
      },
      cook: {
                name: 'Cook', // We'll need to fetch cook details separately
                initials: 'CO',
                phone: 'No phone'
      },
              items: orderData.items?.map((item: any) => item.name) || ['No items'],
              total: `$${(orderData.totalAmount || 0).toFixed(2)}`,
              status: orderData.status || 'pending',
              date: orderData.createdAt ? new Date((orderData.createdAt as Timestamp).toDate()).toLocaleDateString() : 'N/A'
            };
            
            ordersData.push(order);
            totalOrders++;
            
            switch (orderData.status) {
              case 'pending':
                pendingOrders++;
                break;
              case 'confirmed':
              case 'preparing':
                inProgressOrders++;
                break;
              case 'delivered':
                completedOrders++;
                break;
            }
          });

          setOrders(ordersData);
          setStats({
            totalOrders,
            pendingOrders,
            inProgressOrders,
            completedOrders
          });
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.cook.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || order.status === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <main className="bg-[oklab(0.944144_0.00154236_-0.00510991_/_0.5)] box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)] overflow-auto p-[21px]">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading orders...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[oklab(0.944144_0.00154236_-0.00510991_/_0.5)] box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)] overflow-auto p-[21px]">
      <div className="box-border outline-[oklab(0.708_0_0_/_0.5)]">
        <div className="box-border outline-[oklab(0.708_0_0_/_0.5)] mb-[21px]">
          <h1 className="text-[32px] font-bold box-border leading-[38px] outline-[oklab(0.708_0_0_/_0.5)]">Order Management</h1>
          <p className="text-gray-500 box-border outline-[oklab(0.708_0_0_/_0.5)] text-lg">Track and manage all platform orders in real-time.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Total Orders</h3>
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 7L13 15L9 11L3 17" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 13V7H15" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">{stats.totalOrders}</div>
            <div className="text-green-600 text-sm">All time orders</div>
          </div>
          
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Pending</h3>
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">{stats.pendingOrders}</div>
            <div className="text-amber-600 text-sm">Awaiting confirmation</div>
          </div>
          
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">In Progress</h3>
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2V6" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18V22" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.93 4.93L7.76 7.76" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.24 16.24L19.07 19.07" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H6" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 12H22" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.93 19.07L7.76 16.24" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.24 7.76L19.07 4.93" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">{stats.inProgressOrders}</div>
            <div className="text-blue-600 text-sm">Being prepared</div>
          </div>
          
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Completed</h3>
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">{stats.completedOrders}</div>
            <div className="text-green-600 text-sm">Successfully delivered</div>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Search orders by ID, customer, or cook..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:w-48">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All Status</option>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Preparing</option>
                <option>Delivered</option>
                <option>Completed</option>
              </select>
            </div>
            </div>
          </div>
          
        {/* Orders Table */}
        <div className="bg-white rounded-[12px] border border-solid border-black/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cook</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium">
                          {order.customer.initials}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                          <div className="text-sm text-gray-500">{order.customer.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-medium">
                          {order.cook.initials}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{order.cook.name}</div>
                          <div className="text-sm text-gray-500">{order.cook.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.items.slice(0, 2).join(', ')}
                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'completed' || order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'preparing' || order.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
