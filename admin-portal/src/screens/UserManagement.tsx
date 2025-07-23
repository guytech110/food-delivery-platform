import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from '../types';

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    suspendedUsers: 0
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('createdAt', 'desc'));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const usersData: User[] = [];
          let totalUsers = 0;
          let activeUsers = 0;
          let newUsers = 0;
          let suspendedUsers = 0;

          snapshot.forEach((doc) => {
            const userData = doc.data() as User;
            const user = {
              ...userData,
              id: doc.id,
              initials: userData.displayName ? userData.displayName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U',
              status: userData.isActive ? 'active' : 'suspended',
              orders: userData.orderCount || 0,
              spent: `$${(userData.totalSpent || 0).toFixed(2)}`,
              rating: userData.rating || 0,
              joinDate: userData.createdAt ? new Date(userData.createdAt.toDate()).toLocaleDateString() : 'N/A'
            };
            
            usersData.push(user);
            totalUsers++;
            
            if (userData.isActive) {
              activeUsers++;
            } else {
              suspendedUsers++;
            }
            
            // Count new users (joined in last 30 days)
            if (userData.createdAt && userData.createdAt.toDate() > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
              newUsers++;
            }
          });

          setUsers(usersData);
          setStats({
            totalUsers,
            activeUsers,
            newUsers,
            suspendedUsers
          });
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <main className="bg-[oklab(0.944144_0.00154236_-0.00510991_/_0.5)] box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)] overflow-auto p-[21px]">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[oklab(0.944144_0.00154236_-0.00510991_/_0.5)] box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)] overflow-auto p-[21px]">
      <div className="box-border outline-[oklab(0.708_0_0_/_0.5)]">
        <div className="box-border outline-[oklab(0.708_0_0_/_0.5)] mb-[21px]">
          <h1 className="text-[32px] font-bold box-border leading-[38px] outline-[oklab(0.708_0_0_/_0.5)]">User Management</h1>
          <p className="text-gray-500 box-border outline-[oklab(0.708_0_0_/_0.5)] text-lg">Manage customer accounts, view profiles, and track user activity.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Total Users</h3>
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 7L13 15L9 11L3 17" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 13V7H15" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
            <div className="text-green-600 text-sm">+{stats.newUsers} new this month</div>
          </div>
          
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Active Users</h3>
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">{stats.activeUsers}</div>
            <div className="text-gray-500 text-sm">{((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of total</div>
          </div>
          
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">New Users</h3>
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V19C16 16.7909 14.2091 15 12 15H6C3.79086 15 2 16.7909 2 19V21" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">{stats.newUsers}</div>
            <div className="text-green-600 text-sm">+{((stats.newUsers / stats.totalUsers) * 100).toFixed(1)}% growth</div>
          </div>
          
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Suspended</h3>
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.364 18.364A9 9 0 1 1 5.636 5.636A9 9 0 0 1 18.364 18.364Z" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2V22" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">{stats.suspendedUsers}</div>
            <div className="text-red-600 text-sm">{((stats.suspendedUsers / stats.totalUsers) * 100).toFixed(1)}% of total</div>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Search users by name or email..."
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
                <option>Active</option>
                <option>Suspended</option>
              </select>
            </div>
            </div>
          </div>
          
        {/* Users Table */}
        <div className="bg-white rounded-[12px] border border-solid border-black/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                          {user.initials}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.displayName || 'Unknown User'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phoneNumber || 'No phone'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.spent}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{user.rating}</span>
                        <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
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
