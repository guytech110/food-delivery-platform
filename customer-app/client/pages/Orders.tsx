import React, { useState, useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";
import { useOrders } from "../contexts/OrderContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { MapPin } from "lucide-react";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'accepted': return 'bg-blue-100 text-blue-800';
    case 'cooking': return 'bg-orange-100 text-orange-800';
    case 'ready': return 'bg-green-100 text-green-800';
    case 'delivered': return 'bg-gray-100 text-gray-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'Pending';
    case 'accepted': return 'Accepted';
    case 'cooking': return 'Cooking';
    case 'ready': return 'Ready';
    case 'delivered': return 'Delivered';
    case 'cancelled': return 'Cancelled';
    default: return 'Unknown';
  }
};

const Orders = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const { customerOrders, subscribeToCustomerOrders, isLoading } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('Customer Orders.tsx - Setting up listener for user:', user.id);
      const unsubscribe = subscribeToCustomerOrders(user.id);
      return () => {
        console.log('Customer Orders.tsx - Cleaning up listener for user:', user.id);
        unsubscribe();
      };
    }
  }, [user, subscribeToCustomerOrders]);

  const activeOrders = customerOrders.filter(order => 
    ['pending', 'accepted', 'cooking', 'ready'].includes(order.status)
  );
  const pastOrders = customerOrders.filter(order => 
    ['delivered', 'cancelled'].includes(order.status)
  );



  return (
    <div className="min-h-screen bg-white w-full max-w-sm mx-auto relative">
      {/* Header */}
      <div className="p-5 pt-12">
        <h1 className="text-2xl font-bold text-black font-urbanist">Orders</h1>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium font-urbanist transition-colors ${
              activeTab === 'active'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Active ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium font-urbanist transition-colors ${
              activeTab === 'past'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Past ({pastOrders.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-24">
        {activeTab === 'active' ? (
          activeOrders.length > 0 ? (
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 font-urbanist">
                        {order.restaurantName}
                      </h3>
                      <p className="text-sm text-gray-600 font-urbanist">
                        {order.orderId} • {order.orderDate}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium font-urbanist ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600 font-urbanist">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium font-urbanist">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 font-urbanist">
                        Est. delivery: {order.estimatedDeliveryTime?.toDate?.()?.toLocaleString() || 'N/A'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 font-urbanist">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Track Order Button */}
                  <div className="mt-3">
                    <Button
                      onClick={() => navigate(`/order-tracking/${order.id}`)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Track Order
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-black mb-2 font-urbanist">
                No Active Orders
              </h3>
              <p className="text-sm text-gray-600 font-urbanist">
                You don't have any active orders right now.
              </p>
            </div>
          )
        ) : (
          pastOrders.length > 0 ? (
            <div className="space-y-4">
              {pastOrders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 font-urbanist">
                        {order.restaurantName}
                      </h3>
                      <p className="text-sm text-gray-600 font-urbanist">
                        {order.orderId} • {order.orderDate}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium font-urbanist ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600 font-urbanist">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium font-urbanist">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-3 flex justify-between items-center">
                    <div className="text-right w-full">
                      <p className="font-semibold text-gray-900 font-urbanist">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-black mb-2 font-urbanist">
                No Past Orders
              </h3>
              <p className="text-sm text-gray-600 font-urbanist">
                You haven't placed any orders yet.
              </p>
            </div>
          )
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Orders;
