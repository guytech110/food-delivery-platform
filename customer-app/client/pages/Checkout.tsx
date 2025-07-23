import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrderContext';
import { useToast } from '../hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, getDeliveryFee, getTotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const { user, updateUser } = useAuth();
  const { createOrder, isLoading } = useOrders();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // New state for delivery information
  const [deliveryAddress, setDeliveryAddress] = useState(user?.deliveryAddress || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tipAmount, setTipAmount] = useState<number | 'custom'>(0);
  const [customTip, setCustomTip] = useState('');

  // Tip options
  const tipOptions = [
    { label: 'No tip', value: 0 },
    { label: '10%', value: 0.1 },
    { label: '15%', value: 0.15 },
    { label: '20%', value: 0.2 },
    { label: 'Custom', value: 'custom' as const }
  ];

  // Calculate tip amount
  const calculateTip = () => {
    if (tipAmount === 'custom') {
      return parseFloat(customTip) || 0;
    }
    return getSubtotal() * tipAmount;
  };

  // Calculate final total including tip
  const getFinalTotal = () => {
    return getTotal() + calculateTip();
  };

  // Save delivery information to user profile
  const saveDeliveryInfo = () => {
    if (user) {
      updateUser({
        deliveryAddress: deliveryAddress,
        phoneNumber: phoneNumber
      });
    }
  };

  const handlePlaceOrder = async () => {
    // Validate required fields
    if (!deliveryAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter your delivery address",
        variant: "destructive",
      });
      return;
    }
    if (!phoneNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to place an order",
        variant: "destructive",
      });
      return;
    }

    // Save delivery info to profile
    saveDeliveryInfo();

    setIsProcessing(true);
    
    try {
      // Create order items from cart
      const orderItems = items.map(item => ({
        id: item.id,
        name: item.menuItem.name,
        price: item.menuItem.price,
        quantity: item.quantity,
        image: item.menuItem.image,
        description: item.menuItem.description
      }));

      // Get cook information from first item
      const cookId = items[0]?.restaurantId;
      const cookName = items[0]?.restaurantName || "Local Cook";

      // Create order data
      const orderData = {
        customerId: user.id,
        customerName: user.name,
        customerPhone: phoneNumber,
        cookId: cookId,
        cookName: cookName,
        items: orderItems,
        subtotal: getSubtotal(),
        deliveryFee: getDeliveryFee(),
        total: getFinalTotal(),
        status: 'pending' as const,
        deliveryAddress: deliveryAddress,
        deliveryInstructions: '',
        paymentStatus: 'pending' as const,
        paymentMethod: 'cash'
      };

      // Create order in Firebase
      const result = await createOrder(orderData);
      
      if (result.success) {
        // Clear cart and redirect to order confirmation
        clearCart();
        navigate('/order-confirmation', { 
          state: { 
            orderId: result.orderId,
            restaurantName: cookName,
            total: getFinalTotal(),
            estimatedDelivery: '25-35 minutes'
          }
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
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13H17Z"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-black mb-2 font-urbanist">
            Your cart is empty
          </h3>
          <p className="text-sm text-gray-600 font-urbanist mb-4">
            Add some delicious food to your cart first
          </p>
          <button
            onClick={() => navigate('/home')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-5 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
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
            Checkout
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Restaurant Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-gray-900 mb-1 font-urbanist">
            {items[0]?.restaurantName}
          </h2>
          <p className="text-sm text-gray-600 font-urbanist">
            {items.length} item{items.length !== 1 ? 's' : ''} in your order
          </p>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <img
                src={item.menuItem.image}
                alt={item.menuItem.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 font-urbanist">
                  {item.menuItem.name}
                </h3>
                <p className="text-sm text-gray-600 font-urbanist">
                  ${item.menuItem.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <span className="w-8 text-center font-medium font-urbanist">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 font-urbanist">
                  ${(item.menuItem.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Information */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 font-urbanist">
            Delivery Information
          </h3>
          <div className="space-y-4">
            {/* Delivery Address */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 font-urbanist">
                  Delivery Address *
                </label>
                <button
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-green-600 text-sm font-medium hover:text-green-700 font-urbanist"
                >
                  {isEditingAddress ? 'Save' : 'Edit'}
                </button>
              </div>
              {isEditingAddress ? (
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your full delivery address"
                  className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-urbanist"
                  required
                />
              ) : (
                <div className="w-full h-20 px-3 py-2 bg-white border border-gray-300 rounded-lg flex items-start font-urbanist">
                  <span className="text-gray-900">
                    {deliveryAddress || 'No delivery address set'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Phone Number */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 font-urbanist">
                  Phone Number *
                </label>
                <button
                  onClick={() => setIsEditingPhone(!isEditingPhone)}
                  className="text-green-600 text-sm font-medium hover:text-green-700 font-urbanist"
                >
                  {isEditingPhone ? 'Save' : 'Edit'}
                </button>
              </div>
              {isEditingPhone ? (
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-urbanist"
                  required
                />
              ) : (
                <div className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg font-urbanist">
                  <span className="text-gray-900">
                    {phoneNumber || 'No phone number set'}
                  </span>
                </div>
              )}
            </div>

            {/* Customer Info */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">{user?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-medium">25-35 minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tip Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 font-urbanist">
            Add a Tip
          </h3>
          <div className="space-y-3">
            {/* Tip Options */}
            <div className="grid grid-cols-3 gap-2">
              {tipOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => {
                    setTipAmount(option.value);
                    if (option.value !== 'custom') {
                      setCustomTip('');
                    }
                  }}
                  className={`py-2 px-3 rounded-lg text-sm font-medium font-urbanist transition-colors ${
                    tipAmount === option.value
                      ? 'bg-green-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {/* Custom Tip Input */}
            {tipAmount === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-urbanist">
                  Custom Tip Amount ($)
                </label>
                <input
                  type="number"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-urbanist"
                />
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 font-urbanist">
            Order Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">${getDeliveryFee().toFixed(2)}</span>
            </div>
            {calculateTip() > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tip</span>
                <span className="font-medium">${calculateTip().toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-green-600">${getFinalTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className={`w-full py-4 rounded-lg font-semibold text-white font-urbanist transition-colors ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Order...
            </div>
          ) : (
            `Place Order - $${getFinalTotal().toFixed(2)}`
          )}
        </button>
      </div>
    </div>
  );
};

export default Checkout; 