import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { collection, query, orderBy, onSnapshot, where, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export function AnalyticsReports() {
  const [activeTab, setActiveTab] = useState('revenue');
  const [timeRange, setTimeRange] = useState('Last 6 months');
  const [analyticsData, setAnalyticsData] = useState<{
    labels: string[];
    revenue: number[];
    orders: number[];
    users: number[];
    cooks: number[];
  }>({
    labels: [],
    revenue: [],
    orders: [],
    users: [],
    cooks: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Fetch orders for revenue and order analytics
        const ordersRef = collection(db, 'orders');
        const ordersQuery = query(ordersRef, orderBy('createdAt', 'desc'));
        
        const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
          const ordersData: any[] = [];
          snapshot.forEach((doc) => {
            ordersData.push({ id: doc.id, ...doc.data() });
          });

          // Fetch users for user growth analytics
          const usersRef = collection(db, 'users');
          const usersQuery = query(usersRef, orderBy('createdAt', 'desc'));
          
          const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
            const usersData: any[] = [];
            snapshot.forEach((doc) => {
              usersData.push({ id: doc.id, ...doc.data() });
            });

            // Fetch cooks for cook analytics
            const cooksRef = collection(db, 'cooks');
            const cooksQuery = query(cooksRef, orderBy('createdAt', 'desc'));
            
            const unsubscribeCooks = onSnapshot(cooksQuery, (snapshot) => {
              const cooksData: any[] = [];
              snapshot.forEach((doc) => {
                cooksData.push({ id: doc.id, ...doc.data() });
              });

              // Process data for charts
              const processedData = processAnalyticsData(ordersData, usersData, cooksData);
              setAnalyticsData(processedData);
              setLoading(false);
            });

            return unsubscribeCooks;
          });

          return unsubscribeUsers;
        });

        return unsubscribeOrders;
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const processAnalyticsData = (orders: any[], users: any[], cooks: any[]) => {
    const now = new Date();
    const months = [];
    const revenueData = [];
    const ordersData = [];
    const usersData = [];
    const cooksData = [];

    // Generate last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(date.toLocaleDateString('en-US', { month: 'short' }));
      
      // Calculate revenue for this month
      const monthRevenue = orders
        .filter(order => {
          const orderDate = order.createdAt?.toDate?.() || new Date(order.createdAt);
          return orderDate.getMonth() === date.getMonth() && 
                 orderDate.getFullYear() === date.getFullYear();
        })
        .reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      revenueData.push(monthRevenue);

      // Calculate orders for this month
      const monthOrders = orders.filter(order => {
        const orderDate = order.createdAt?.toDate?.() || new Date(order.createdAt);
        return orderDate.getMonth() === date.getMonth() && 
               orderDate.getFullYear() === date.getFullYear();
      }).length;
      ordersData.push(monthOrders);

      // Calculate user growth for this month
      const monthUsers = users.filter(user => {
        const userDate = user.createdAt?.toDate?.() || new Date(user.createdAt);
        return userDate.getMonth() === date.getMonth() && 
               userDate.getFullYear() === date.getFullYear();
      }).length;
      usersData.push(monthUsers);

      // Calculate cook growth for this month
      const monthCooks = cooks.filter(cook => {
        const cookDate = cook.createdAt?.toDate?.() || new Date(cook.createdAt);
        return cookDate.getMonth() === date.getMonth() && 
               cookDate.getFullYear() === date.getFullYear();
      }).length;
      cooksData.push(monthCooks);
    }

    return {
      labels: months,
      revenue: revenueData,
      orders: ordersData,
      users: usersData,
      cooks: cooksData
    };
  };

  // Revenue chart data
  const revenueData = {
    labels: analyticsData.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Revenue',
        data: analyticsData.revenue || [0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgb(16, 185, 129)',
        order: 2,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: 'Orders',
        data: analyticsData.orders || [0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        pointBackgroundColor: 'rgb(249, 115, 22)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(249, 115, 22)',
        tension: 0.4,
        order: 1,
        yAxisID: 'y1',
      },
      {
        type: 'line' as const,
        label: 'User Growth',
        data: analyticsData.users || [0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
        order: 0,
        yAxisID: 'y1',
        hidden: true,
      }
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Revenue ($)',
        },
        min: 0,
        grid: {
          drawOnChartArea: false,
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Orders',
        },
        min: 0,
        max: 800,
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: false,
        },
      },
    },
  };

  // Orders data for the Orders tab
  const ordersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Completed Orders',
        data: [320, 350, 330, 380, 420, 410, 450],
        backgroundColor: 'rgb(16, 185, 129)',
      },
      {
        label: 'Cancelled Orders',
        data: [30, 25, 35, 28, 32, 30, 35],
        backgroundColor: 'rgb(239, 68, 68)',
      }
    ],
  };

  const ordersOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Orders',
        },
      },
    },
  };

  // Users data for the Users tab
  const usersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'New Users',
        data: [120, 150, 140, 180, 200, 210, 230],
        backgroundColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Active Users',
        data: [800, 850, 880, 920, 980, 1050, 1100],
        backgroundColor: 'rgb(16, 185, 129)',
      }
    ],
  };

  const usersOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Users',
        },
      },
    },
  };

  // Geographic data for the Geographic tab
  const geoData = {
    labels: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'],
    datasets: [
      {
        label: 'Orders by City',
        data: [250, 220, 180, 160, 140, 120],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }
    ],
  };

  const geoOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  // Revenue breakdown data
  const revenueBreakdownData = [
    { category: 'Food Sales', amount: 42350, percentage: 77, color: '#111827' },
    { category: 'Delivery Fees', amount: 8470, percentage: 15, color: '#10B981' },
    { category: 'Platform Fees', amount: 4180, percentage: 8, color: '#F59E0B' },
  ];

  // Key metrics data
  const keyMetricsData = [
    { metric: 'Total Revenue', value: '$55,000', icon: '$' },
    { metric: 'Total Orders', value: '720', icon: '📋' },
    { metric: 'New Users', value: '234', icon: '👤' },
  ];

  if (loading) {
    return (
      <main className="bg-[oklab(0.944144_0.00154236_-0.00510991_/_0.5)] box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)] overflow-auto p-[21px]">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading analytics data...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[oklab(0.944144_0.00154236_-0.00510991_/_0.5)] box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)] overflow-auto p-[21px]">
      <div className="box-border outline-[oklab(0.708_0_0_/_0.5)]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-[32px] font-bold box-border leading-[38px] outline-[oklab(0.708_0_0_/_0.5)]">Analytics & Reports</h1>
            <p className="text-gray-500 box-border outline-[oklab(0.708_0_0_/_0.5)] text-lg">Comprehensive insights into your platform's performance and growth.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option>Last 6 months</option>
                <option>Last 3 months</option>
                <option>Last month</option>
                <option>Last week</option>
                <option>Custom range</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export Report
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Average Order Value</h3>
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 6H23V12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">$32.45</div>
            <div className="text-green-500 text-sm">+8.2% from last period</div>
          </div>
          
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Order Completion Rate</h3>
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 6H23V12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">94.7%</div>
            <div className="text-green-500 text-sm">+2.1% from last period</div>
          </div>
          
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Average Delivery Time</h3>
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 18L13.5 8.5L8.5 13.5L1 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 18H23V12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">28 min</div>
            <div className="text-red-500 text-sm">-3.2% from last period</div>
          </div>
          
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Customer Satisfaction</h3>
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 6H23V12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">4.8/5</div>
            <div className="text-green-500 text-sm">+0.3 from last period</div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            className={`py-2 px-6 text-sm font-medium ${activeTab === 'revenue' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('revenue')}
          >
            Revenue
          </button>
          <button 
            className={`py-2 px-6 text-sm font-medium ${activeTab === 'orders' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={`py-2 px-6 text-sm font-medium ${activeTab === 'users' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button 
            className={`py-2 px-6 text-sm font-medium ${activeTab === 'geographic' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('geographic')}
          >
            Geographic
          </button>
        </div>
        
        {/* Main Chart */}
        <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10 mb-6">
          {activeTab === 'revenue' && (
            <>
              <h2 className="text-xl font-semibold mb-1">Revenue Trends</h2>
              <p className="text-gray-500 mb-4">Monthly revenue, orders, and user growth</p>
              <div className="h-[400px]">
                <Bar data={revenueData} options={revenueOptions} />
              </div>
            </>
          )}
          
          {activeTab === 'orders' && (
            <>
              <h2 className="text-xl font-semibold mb-1">Order Trends</h2>
              <p className="text-gray-500 mb-4">Monthly completed and cancelled orders</p>
              <div className="h-[400px]">
                <Bar data={ordersData} options={ordersOptions} />
              </div>
            </>
          )}
          
          {activeTab === 'users' && (
            <>
              <h2 className="text-xl font-semibold mb-1">User Trends</h2>
              <p className="text-gray-500 mb-4">Monthly new and active users</p>
              <div className="h-[400px]">
                <Bar data={usersData} options={usersOptions} />
              </div>
            </>
          )}
          
          {activeTab === 'geographic' && (
            <>
              <h2 className="text-xl font-semibold mb-1">Geographic Distribution</h2>
              <p className="text-gray-500 mb-4">Orders by city</p>
              <div className="h-[400px]">
                <Doughnut data={geoData} options={geoOptions} />
              </div>
            </>
          )}
        </div>
        
        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Revenue Breakdown */}
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <h2 className="text-xl font-semibold mb-1">Revenue Breakdown</h2>
            <p className="text-gray-500 mb-4">This month's performance</p>
            
            <div className="space-y-6">
              {revenueBreakdownData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{item.category}</span>
                    <span className="font-medium">${item.amount.toLocaleString()} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="bg-white p-6 rounded-[12px] border border-solid border-black/10">
            <h2 className="text-xl font-semibold mb-1">Key Metrics</h2>
            <p className="text-gray-500 mb-4">Current month performance</p>
            
            <div className="space-y-6">
              {keyMetricsData.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-lg">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.metric}</span>
                  </div>
                  <span className="text-xl font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
