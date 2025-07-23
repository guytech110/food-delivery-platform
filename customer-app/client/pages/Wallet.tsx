import React from "react";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-5 pt-12">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#00955D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-black font-urbanist">
          Wallet
        </h1>
        <div className="w-8"></div>
      </div>

      {/* Wallet Balance Card */}
      <div className="mx-5 mb-6">
        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-6 text-white">
          <div className="mb-4">
            <h2 className="text-sm opacity-80 font-urbanist">Total Balance</h2>
            <h3 className="text-3xl font-bold font-urbanist">$142.50</h3>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs opacity-80 font-urbanist">Available</p>
              <p className="text-lg font-semibold font-urbanist">$142.50</p>
            </div>
            <div>
              <p className="text-xs opacity-80 font-urbanist">Pending</p>
              <p className="text-lg font-semibold font-urbanist">$0.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mx-5 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-primary text-white py-4 rounded-2xl font-semibold font-urbanist">
            Add Money
          </button>
          <button className="border border-primary text-primary py-4 rounded-2xl font-semibold font-urbanist">
            Withdraw
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="mx-5">
        <h3 className="text-lg font-semibold text-black mb-4 font-urbanist">
          Recent Transactions
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                    fill="#00955D"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-black font-urbanist">
                  Order Payment
                </p>
                <p className="text-sm text-gray-500 font-urbanist">
                  Dec 15, 2023
                </p>
              </div>
            </div>
            <p className="font-semibold text-red-500 font-urbanist">-$25.99</p>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                    fill="#3B82F6"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-black font-urbanist">
                  Wallet Top-up
                </p>
                <p className="text-sm text-gray-500 font-urbanist">
                  Dec 12, 2023
                </p>
              </div>
            </div>
            <p className="font-semibold text-green-500 font-urbanist">
              +$50.00
            </p>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                    fill="#00955D"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-black font-urbanist">
                  Order Payment
                </p>
                <p className="text-sm text-gray-500 font-urbanist">
                  Dec 10, 2023
                </p>
              </div>
            </div>
            <p className="font-semibold text-red-500 font-urbanist">-$18.50</p>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                    fill="#F97316"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-black font-urbanist">
                  Cashback Reward
                </p>
                <p className="text-sm text-gray-500 font-urbanist">
                  Dec 8, 2023
                </p>
              </div>
            </div>
            <p className="font-semibold text-green-500 font-urbanist">+$2.99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
