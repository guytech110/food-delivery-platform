import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Cook } from '../types';

interface DisplayCook {
  id: string;
  name: string;
  initials: string;
  location: string;
  specialties: string[];
  status: string;
  verification: string;
  rating: number;
  orders: number;
  earnings: string;
}

export function CookManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [cooks, setCooks] = useState<DisplayCook[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCooks: 0,
    activeCooks: 0,
    pendingApplications: 0,
    verifiedCooks: 0
  });

  useEffect(() => {
    const fetchCooks = async () => {
      try {
        const cooksRef = collection(db, 'cooks');
        const q = query(cooksRef, orderBy('createdAt', 'desc'));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const cooksData: DisplayCook[] = [];
          let totalCooks = 0;
          let activeCooks = 0;
          let pendingApplications = 0;
          let verifiedCooks = 0;

          snapshot.forEach((doc) => {
            const cookData = doc.data() as any;
            const cook: DisplayCook = {
              id: doc.id,
              name: cookData.name || 'Unknown Cook',
              initials: cookData.name ? cookData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'UC',
              location: cookData.address || 'Location not specified',
              specialties: cookData.specialties || ['General'],
              status: cookData.isActive ? 'active' : 'inactive',
              verification: cookData.verificationStatus || 'pending',
              rating: cookData.performance?.rating || 0,
              orders: cookData.performance?.totalOrders || 0,
              earnings: `$${(cookData.earnings?.total || 0).toFixed(2)}`
            };
            
            cooksData.push(cook);
            totalCooks++;
            
            if (cookData.isActive) {
              activeCooks++;
            }
            
            if (cookData.verificationStatus === 'pending') {
              pendingApplications++;
            }
            
            if (cookData.verificationStatus === 'approved') {
              verifiedCooks++;
            }
          });

          setCooks(cooksData);
          setStats({
            totalCooks,
            activeCooks,
            pendingApplications,
            verifiedCooks
          });
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error fetching cooks:', error);
        setLoading(false);
      }
    };

    fetchCooks();
  }, []);

  const filteredCooks = cooks.filter(cook => {
    const matchesSearch = searchQuery === '' || 
      cook.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cook.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cook.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All Status' || cook.status === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <main className="bg-[oklab(0.944144_0.00154236_-0.00510991_/_0.5)] box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)] overflow-auto p-[21px]">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading cooks...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[oklab(0.944144_0.00154236_-0.00510991_/_0.5)] box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)] overflow-auto p-[21px]">
      <div className="box-border outline-[oklab(0.708_0_0_/_0.5)]">
        <div className="box-border outline-[oklab(0.708_0_0_/_0.5)] mb-[21px]">
          <h1 className="text-[32px] font-bold box-border leading-[38px] outline-[oklab(0.708_0_0_/_0.5)]">Cook Management</h1>
          <p className="text-gray-500 box-border outline-[oklab(0.708_0_0_/_0.5)] text-lg">Manage cook applications, verify credentials, and monitor performance.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Total Cooks</h3>
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">{stats.totalCooks}</div>
            <div className="text-gray-500 text-sm">Registered cooks</div>
          </div>
          
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Active Cooks</h3>
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">{stats.activeCooks}</div>
            <div className="text-green-600 text-sm">{((stats.activeCooks / stats.totalCooks) * 100).toFixed(1)}% of total</div>
          </div>
          
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Pending Applications</h3>
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">{stats.pendingApplications}</div>
            <div className="text-amber-600 text-sm">Awaiting review</div>
          </div>
          
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Verified Cooks</h3>
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#9333EA" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">{stats.verifiedCooks}</div>
            <div className="text-purple-600 text-sm">KYC completed</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search cooks by name, location, or specialties..."
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
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cooks Table */}
        <div className="bg-white rounded-[12px] border border-solid border-black/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cook</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialties</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCooks.map((cook) => (
                  <tr key={cook.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                          {cook.initials}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{cook.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cook.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {cook.specialties.slice(0, 2).map((specialty, index) => (
                          <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {specialty}
                          </span>
                        ))}
                        {cook.specialties.length > 2 && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            +{cook.specialties.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        cook.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cook.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        cook.verification === 'approved' 
                          ? 'bg-green-100 text-green-800'
                          : cook.verification === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cook.verification}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{cook.rating}</span>
                        <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cook.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cook.earnings}</td>
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
