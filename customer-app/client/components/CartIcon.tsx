import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartIcon: React.FC = () => {
  const { getTotalItems, items, getSubtotal, getDeliveryFee, getTotal } = useCart();
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  const totalItems = getTotalItems();

  const handleCartClick = () => {
    if (totalItems > 0) {
      setShowCart(!showCart);
    }
  };

  const handleCheckout = () => {
    setShowCart(false);
    // Navigate to checkout page (we'll create this later)
    navigate('/checkout');
  };

  return (
    <div className="relative">
      {/* Cart Icon */}
      <button
        onClick={handleCartClick}
        className="relative p-3 bg-gradient-to-tr from-green-400 to-green-600 text-white rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-150"
        aria-label="View cart"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13H17Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Item Count Badge */}
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg border-2 border-white">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {showCart && totalItems > 0 && (
        <div className="absolute top-14 right-0 w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 animate-fade-in">
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-lg">Your Cart</h3>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="max-h-60 overflow-y-auto space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.menuItem.name}</h4>
                    <p className="text-xs text-gray-600">{item.restaurantName}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${(item.menuItem.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery:</span>
                <span>${getDeliveryFee().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-5 rounded-full font-semibold text-base shadow hover:scale-105 transition-all"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartIcon; 