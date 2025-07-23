import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import { useMenu } from "@/contexts/MenuContext";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "../components/BottomNavigation";
import NotificationBell from "../components/NotificationBell";

// Landing page component for unauthenticated users
export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto relative">
      {/* Hero Image */}
      <div className="relative h-[546px] w-full overflow-hidden">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fb7ee5601c6e8447cbda74f8c8f572081%2F6bcd353a74a8452ab3adbcfd05d82151?format=webp&width=800"
          alt="Chef cooking in kitchen"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-white rounded-t-[24px] -mt-24 relative z-10 px-5 pt-8 pb-10">
        <div className="flex flex-col items-center gap-6">
          {/* Text Content */}
          <div className="flex flex-col items-center gap-4 text-center px-2">
            <h1
              className="text-[28px] font-medium leading-tight text-[#191919] max-w-[251px]"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Stay in Control of Your Orders
            </h1>
            <p
              className="text-base font-normal leading-[22.4px] text-[#5e5e5e]"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Accept requests, track progress, and delight your customers with
              real-time updates
            </p>
          </div>

          {/* Login Button */}
          <div className="w-full mt-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full h-[60px] bg-[#00955d] hover:bg-[#007a4d] text-white font-normal text-base rounded-[14px]"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Login
            </button>

            {/* Sign Up Text Link */}
            <div className="text-center mt-4">
              <p
                className="text-sm text-[#5e5e5e]"
                style={{
                  fontFamily:
                    "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-[#00955d] font-medium cursor-pointer"
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>

          {/* Terms and Privacy */}
          <div
            className="text-center text-xs text-[#5e5e5e] leading-[16.8px] mt-2"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            <span>By continuing you agree to our </span>
            <span className="text-[#00955d] underline font-medium cursor-pointer">
              Terms of Service
            </span>
            <span> and </span>
            <span className="text-[#00955d] underline font-medium cursor-pointer">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Activity interface
interface Activity {
  id: string;
  type: 'order' | 'menu' | 'earnings' | 'review';
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
  status?: string;
  amount?: number;
}

export default function Index() {
  const navigate = useNavigate();
  const { cook, isAuthenticated, isLoading, logout } = useAuth();
  const { cookOrders } = useOrders();
  const { cookMenuItems } = useMenu();
  const { toast } = useToast();
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [hasRedirected, setHasRedirected] = useState(false);

  // Generate recent activities based on real data
  useEffect(() => {
    if (!cook) return;

    const activities: Activity[] = [];

    // Add recent orders
    const recentOrders = cookOrders
      .filter(order => order.status !== 'cancelled')
      .sort((a, b) => new Date(b.createdAt.toDate()).getTime() - new Date(a.createdAt.toDate()).getTime())
      .slice(0, 3);

    recentOrders.forEach(order => {
      activities.push({
        id: `order-${order.id}`,
        type: 'order',
        title: `New Order #${order.id.slice(-6)}`,
        description: `${order.items.length} items • $${order.total.toFixed(2)}`,
        timestamp: order.createdAt.toDate(),
        icon: '🛒',
        status: order.status
      });
    });

    // Add recent menu changes (if any)
    const recentMenuItems = cookMenuItems
      .sort((a, b) => new Date(b.updatedAt.toDate()).getTime() - new Date(a.updatedAt.toDate()).getTime())
      .slice(0, 2);

    recentMenuItems.forEach(item => {
      activities.push({
        id: `menu-${item.id}`,
        type: 'menu',
        title: `${item.name} ${item.isAvailable ? 'Available' : 'Unavailable'}`,
        description: `$${item.price.toFixed(2)} • ${item.category}`,
        timestamp: item.updatedAt.toDate(),
        icon: '🍽️',
        status: item.isAvailable ? 'active' : 'inactive'
      });
    });

    // Add earnings activity (mock for now)
    if (recentOrders.length > 0) {
      const totalEarnings = recentOrders.reduce((sum, order) => sum + order.total, 0);
      activities.push({
        id: 'earnings-today',
        type: 'earnings',
        title: 'Today\'s Earnings',
        description: `${recentOrders.length} orders completed`,
        timestamp: new Date(),
        icon: '💰',
        amount: totalEarnings
      });
    }

    // Sort by timestamp (most recent first)
    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    setRecentActivities(activities.slice(0, 5)); // Show last 5 activities
  }, [cook, cookOrders, cookMenuItems]);

  // Onboarding checks - only for new users
  useEffect(() => {
    if (!isLoading && cook && !hasRedirected) {
      // Check if user needs to complete onboarding
      // If applicationCompleted is true, they've finished the process regardless of verification status
      const needsApplication = cook.applicationCompleted === false;
      const needsVerification = cook.isVerified === false && !needsApplication;
      
      if (needsApplication || needsVerification) {
        setHasRedirected(true);
        // Add a small delay to ensure any pending state updates are processed
        const timeoutId = setTimeout(() => {
          if (needsApplication) {
            navigate("/cook-application/step-1");
          } else if (needsVerification) {
            navigate("/kyc");
          }
        }, 100);
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [isLoading, cook, navigate, hasRedirected]);

  // Don't render if loading or not authenticated
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00955d] mx-auto mb-4"></div>
          <p className="text-[#5e5e5e]">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'accepted': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-white font-urbanist pb-[85px]">
      {/* Header */}
      <div className="w-full h-[170px] bg-gradient-to-b from-[rgba(80,186,108,0.50)] to-[rgba(80,186,108,0.00)] relative">
        <div className="absolute left-5 top-[60px] right-20 pr-2">
          <h1 className="text-2xl font-semibold text-[#191919]">
            Welcome back, {cook?.name || 'Cook'}!
          </h1>
          <p className="text-[#5e5e5e] text-base mt-1">
            Ready to add some delicious items to your menu?
          </p>
        </div>

        {/* Profile Icon with Logout */}
        <div className="absolute right-5 top-[60px] flex items-center gap-2">
          <NotificationBell />
          <button
            onClick={handleLogout}
            className="px-3 py-2 text-sm text-[#00955d] font-medium"
          >
            Logout
          </button>
        <button
          onClick={() => navigate("/profile")}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="#00955d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="#00955d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 pt-[40px] pb-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#f8f9fa] rounded-[16px] p-4 text-center">
            <div className="text-2xl font-bold text-[#00955d] mb-1">{cookMenuItems.length}</div>
            <div className="text-sm text-[#5e5e5e]">Menu Items</div>
          </div>
          <div className="bg-[#f8f9fa] rounded-[16px] p-4 text-center">
            <div className="text-2xl font-bold text-[#00955d] mb-1">
              {cookOrders.filter(order => {
                const today = new Date();
                const orderDate = order.createdAt.toDate();
                return orderDate.toDateString() === today.toDateString();
              }).length}
            </div>
            <div className="text-sm text-[#5e5e5e]">Orders Today</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#191919] mb-4">
            Quick Actions
          </h2>

          <button
            onClick={() => navigate("/new-item")}
            className="w-full bg-gradient-to-r from-[#abe57d] to-[#00955d] rounded-[16px] p-6 text-left mb-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white text-lg font-semibold mb-1">
                  Add New Menu Item
                </h3>
                <p className="text-white/90 text-sm">
                  Start building your menu with delicious items
                </p>
              </div>
              <div className="text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4.5V19.5M19.5 12H4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate("/orders")}
              className="bg-white border border-[#e6e6e6] rounded-[16px] p-4 text-left"
            >
              <div className="text-[#00955d] mb-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 7H21L19 2H5L3 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 7L5 17H19L21 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-[#191919] font-medium text-sm mb-1">
                View Orders
              </h3>
              <p className="text-[#5e5e5e] text-xs">Check incoming orders</p>
            </button>

            <button className="bg-white border border-[#e6e6e6] rounded-[16px] p-4 text-left">
              <div className="text-[#00955d] mb-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-[#191919] font-medium text-sm mb-1">
                Reviews
              </h3>
              <p className="text-[#5e5e5e] text-xs">See customer feedback</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#191919]">
            Recent Activity
          </h2>
            {recentActivities.length > 0 && (
              <button 
                onClick={() => navigate("/orders")}
                className="text-[#00955d] text-sm font-medium"
              >
                View All
              </button>
            )}
          </div>
          
          {recentActivities.length === 0 ? (
          <div className="bg-[#f8f9fa] rounded-[16px] p-6 text-center">
            <div className="text-[#5e5e5e] mb-2">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <path
                  d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-[#191919] font-medium mb-2">No activity yet</h3>
            <p className="text-[#5e5e5e] text-sm">
              Start by adding your first menu item to get things rolling!
            </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="bg-white border border-[#e6e6e6] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-[#191919] font-medium text-sm truncate">
                          {activity.title}
                        </h3>
                        {activity.status && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                        )}
                      </div>
                      <p className="text-[#5e5e5e] text-xs mb-2">
                        {activity.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#5e5e5e] text-xs">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                        {activity.amount && (
                          <span className="text-[#00955d] font-semibold text-sm">
                            ${activity.amount.toFixed(2)}
                          </span>
                        )}
                      </div>
          </div>
        </div>
      </div>
              ))}
          </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
