import BottomNavigation from "../components/BottomNavigation";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { logger } from '@/lib/logger';

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

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { cookOrders, subscribeToCookOrders, updateOrderStatus, isLoading } = useOrders();
  const { cook } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  useEffect(() => {
    if (cook) {
      logger.log('Orders.tsx - Setting up listener for cook:', cook.id);
      const unsubscribe = subscribeToCookOrders(cook.id);
      return () => {
        logger.log('Orders.tsx - Cleaning up listener for cook:', cook.id);
        unsubscribe();
      };
    }
  }, [cook, subscribeToCookOrders]);

  const handleAcceptOrder = async (orderId: string) => {
    try {
      const result = await updateOrderStatus(orderId, 'accepted');
      if (result.success) {
        toast({
          title: "Order Accepted",
          description: "Order has been accepted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept order",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async (orderId: string, status: 'cooking' | 'ready' | 'delivered') => {
    try {
      const result = await updateOrderStatus(orderId, status);
      if (result.success) {
        toast({
          title: "Status Updated",
          description: `Order status updated to ${status}`,
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  // Filter orders by status
  const activeOrders = cookOrders.filter(order => 
    ['pending', 'accepted', 'cooking', 'ready'].includes(order.status)
  );
  
  const historyOrders = cookOrders.filter(order => 
    ['delivered', 'cancelled'].includes(order.status)
  );

  return (
    <div className="min-h-screen bg-white font-urbanist pb-[85px]">
      {/* Header */}
      <div className="w-full h-[170px] bg-gradient-to-b from-[rgba(80,186,108,0.50)] to-[rgba(80,186,108,0.00)] relative">
        <h1 className="absolute left-5 top-[60px] text-black text-4xl font-semibold capitalize">
          Orders
        </h1>

        {/* Tab Switcher */}
        <div className="absolute left-5 top-[133px] flex w-[353px] p-1 items-center gap-[5px] rounded-[30px] border border-white/25 bg-[#eee] backdrop-blur-[15px] h-[53px]">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 h-[45px] px-[39px] py-[11px] rounded-[50px] text-base font-medium capitalize text-center ${
              activeTab === "active"
                ? "bg-white text-[#414040]"
                : "bg-white/10 backdrop-blur-[25px] text-[#6b6b6b]"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 h-[45px] px-[39px] py-[11px] rounded-[50px] text-base font-medium capitalize text-center ${
              activeTab === "history"
                ? "bg-white text-[#414040]"
                : "bg-white/10 backdrop-blur-[25px] text-[#6b6b6b]"
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 pt-[43px] pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00955d]"></div>
            <span className="ml-3 text-[#5e5e5e]">Loading orders...</span>
          </div>
        ) : activeTab === "active" ? (
          // Active Orders Content
          <div className="space-y-5">
            {/* Pending Orders */}
            {activeOrders.filter(order => order.status === 'pending').length > 0 && (
              <div className="space-y-[14px]">
                <h2 className="text-[#333] text-xl font-medium tracking-[0.313px] capitalize">
                  Pending
                </h2>
                <div className="space-y-2">
                  {activeOrders
                    .filter(order => order.status === 'pending')
                    .map((order) => (
                      <button
                        key={order.id}
                        onClick={() => navigate(`/order-details/${order.id}`)}
                        className="w-full flex justify-between items-center p-[14px_18px] rounded-[14px] border border-black/10 bg-[#00955d]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {order.customerName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="text-white text-base font-bold leading-5 capitalize">
                              {order.customerName}
                            </div>
                            <div className="text-[#99d5be] text-sm font-medium leading-5">
                              ${order.total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAcceptOrder(order.id);
                          }}
                          className="flex h-[45px] px-[26px] py-[10px] items-center gap-2 rounded-[100px] bg-[#05734a] text-[#cdf3e4] text-sm font-semibold leading-5 capitalize cursor-pointer"
                        >
                          Accept
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Accepted/Cooking/Ready Orders */}
            {activeOrders.filter(order => ['accepted', 'cooking', 'ready'].includes(order.status)).length > 0 && (
              <div className="space-y-[14px]">
                <h2 className="text-[#333] text-xl font-medium tracking-[0.313px] capitalize">
                  In Progress
                </h2>
                <div className="space-y-2">
                  {activeOrders
                    .filter(order => ['accepted', 'cooking', 'ready'].includes(order.status))
                    .map((order) => (
                      <div key={order.id} className="bg-white rounded-[14px] p-[14px] border border-black/10">
                        <div className="flex justify-between items-center py-[10px]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {order.customerName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <div className="text-[#111827] text-base font-bold leading-5 capitalize">
                                {order.customerName}
                              </div>
                              <div className="text-[#9ca3af] text-sm font-normal leading-5 capitalize">
                                {getStatusText(order.status)}
                              </div>
                            </div>
                          </div>
                          <div className="text-black text-base font-bold capitalize">
                            ${order.total.toFixed(2)}
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-3">
                          {order.status === 'accepted' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'cooking')}
                              className="flex h-[45px] px-[26px] py-[10px] items-center gap-2 rounded-[100px] bg-[#00955d] text-white text-sm font-semibold leading-5 capitalize cursor-pointer"
                            >
                              Start Cooking
                            </button>
                          )}
                          {order.status === 'cooking' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'ready')}
                              className="flex h-[45px] px-[26px] py-[10px] items-center gap-2 rounded-[100px] bg-[#00955d] text-white text-sm font-semibold leading-5 capitalize cursor-pointer"
                            >
                              Mark Ready
                            </button>
                          )}
                          {order.status === 'ready' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleUpdateStatus(order.id, 'delivered')}
                                className="flex h-[45px] px-[26px] py-[10px] items-center gap-2 rounded-[100px] bg-[#05734a] text-[#cdf3e4] text-sm font-semibold leading-5 capitalize cursor-pointer"
                              >
                                Mark Delivered
                              </button>
                              <button
                                onClick={() => navigate(`/delivery-tracking/${order.id}`)}
                                className="flex h-[45px] px-[26px] py-[10px] items-center gap-2 rounded-[100px] bg-blue-600 text-white text-sm font-semibold leading-5 capitalize cursor-pointer"
                              >
                                <Truck className="w-4 h-4" />
                                Track
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* No Active Orders */}
            {activeOrders.length === 0 && (
              <div className="text-center py-12">
                <div className="text-[#5e5e5e] mb-4">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto"
                  >
                    <path
                      d="M3 12H21M3 6H21M3 18H21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="text-[#191919] font-medium mb-2">
                  No active orders
                </h3>
                <p className="text-[#5e5e5e] text-sm">
                  New orders will appear here when customers place them
                </p>
              </div>
            )}
          </div>
        ) : (
          // History Content
          <div className="space-y-[14px]">
            {historyOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-[#5e5e5e] mb-4">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto"
                  >
                    <path
                      d="M3 12H21M3 6H21M3 18H21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="text-[#191919] font-medium mb-2">
                  No order history
                </h3>
                <p className="text-[#5e5e5e] text-sm">
                  Completed orders will appear here
                </p>
              </div>
            ) : (
              historyOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-[14px] p-[14px]">
                  <div className="flex justify-between items-center py-[10px]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {order.customerName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[#111827] text-base font-bold leading-5 capitalize">
                          {order.customerName}
                        </div>
                        <div className="text-[#9ca3af] text-sm font-normal leading-5 capitalize">
                          {order.status === 'delivered' ? 'Completed' : 'Cancelled'}
                        </div>
                      </div>
                    </div>
                    <div className="text-black text-base font-bold capitalize">
                      ${order.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Orders;
