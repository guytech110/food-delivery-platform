import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface OrderConfirmationData {
  orderId: string;
  restaurantName: string;
  total: number;
  estimatedDelivery: string;
}

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Get order data from navigation state
  const orderData = location.state as OrderConfirmationData;

  // If no order data, redirect to home
  if (!orderData) {
    navigate('/home');
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-5 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900 font-urbanist">
            Order Confirmation
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-5 py-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#059669"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-urbanist">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 font-urbanist">
            Thank you for your order. We'll notify you when it's ready.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 font-urbanist">
            Order Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium font-urbanist">{orderData.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Restaurant</span>
              <span className="font-medium font-urbanist">{orderData.restaurantName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-semibold text-green-600 font-urbanist">
                ${orderData.total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery</span>
              <span className="font-medium font-urbanist">{orderData.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 font-urbanist">
            Order Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 font-urbanist">Order Confirmed</p>
                <p className="text-sm text-gray-600 font-urbanist">Your order has been received</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-400 font-urbanist">Preparing</p>
                <p className="text-sm text-gray-400 font-urbanist">Restaurant is preparing your order</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-400 font-urbanist">On the Way</p>
                <p className="text-sm text-gray-400 font-urbanist">Your order is being delivered</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-400 font-urbanist">Delivered</p>
                <p className="text-sm text-gray-400 font-urbanist">Enjoy your meal!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/orders')}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold font-urbanist hover:bg-green-700 transition-colors"
          >
            Track Order
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold font-urbanist hover:bg-gray-200 transition-colors"
          >
            Order Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 