import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetails: React.FC = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleAccept = () => {
    // Handle order acceptance logic
    console.log("Accepting order:", orderId);
    navigate("/orders");
  };

  const handleRejectOrder = () => {
    // Handle order rejection logic
    console.log("Rejecting order:", orderId);
    setShowRejectModal(false);
    navigate("/orders");
  };

  const handleShowRejectModal = () => {
    setShowRejectModal(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f9fa] font-urbanist relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/orders")}
        className="absolute left-5 top-[60px] inline-flex items-center gap-1 px-4 py-4 bg-white rounded-full shadow-[0px_3px_10px_0px_rgba(38,38,38,0.20)] z-10"
      >
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.0896 4.91058C13.415 5.23602 13.415 5.76366 13.0896 6.08909L8.67884 10.4998L13.0896 14.9106C13.415 15.236 13.415 15.7637 13.0896 16.0891C12.7641 16.4145 12.2365 16.4145 11.9111 16.0891L6.91107 11.0891C6.58563 10.7637 6.58563 10.236 6.91107 9.91058L11.9111 4.91058C12.2365 4.58514 12.7641 4.58514 13.0896 4.91058Z"
            fill="#414040"
          />
        </svg>
        <span className="text-[#818181] text-lg font-roboto">Back</span>
      </button>

      {/* Order Title */}
      <div className="absolute left-0 top-[143px] w-full flex justify-center items-center px-5 h-[43px]">
        <h1 className="text-black text-4xl font-bold capitalize">Order</h1>
      </div>

      {/* Order Items */}
      <div className="absolute left-0 top-[211px] w-full flex flex-col items-center gap-[30px] px-5">
        <div className="w-full max-w-[353px] space-y-6">
          {/* Item 1 - Veggie Burger */}
          <div className="flex items-start gap-4">
            <div className="text-[#292b2d] text-base font-bold lowercase">
              1x
            </div>
            <div className="flex-1 space-y-[13px]">
              <div className="flex justify-between items-center">
                <div className="text-[#292b2d] text-base font-bold capitalize">
                  Veggie Burger
                </div>
                <div className="text-[#292b2d] text-base font-bold capitalize">
                  0.50 $
                </div>
              </div>

              {/* Cheese */}
              <div className="space-y-[2px]">
                <div className="text-[#292b2d] text-xs opacity-50 capitalize">
                  Cheese
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[#292b2d] text-base font-bold capitalize">
                    Pepper Jack
                  </div>
                  <div className="text-[#292b2d] text-base font-bold capitalize">
                    0.50 $
                  </div>
                </div>
              </div>

              {/* Add Ons */}
              <div className="space-y-[2px]">
                <div className="text-[#292b2d] text-xs opacity-50 capitalize">
                  Add Ons
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[#292b2d] text-base font-bold capitalize">
                    Avocado
                  </div>
                  <div className="text-[#292b2d] text-base font-bold capitalize">
                    0.50 $
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#ccc]"></div>

          {/* Item 2 - Salad */}
          <div className="flex items-start gap-4">
            <div className="text-[#292b2d] text-base font-bold lowercase">
              2x
            </div>
            <div className="flex-1 space-y-[13px]">
              <div className="flex justify-between items-center">
                <div className="text-[#292b2d] text-base font-bold capitalize">
                  Salad
                </div>
                <div className="text-[#292b2d] text-base font-bold capitalize">
                  0.50 $
                </div>
              </div>

              {/* Cheese */}
              <div className="space-y-[2px]">
                <div className="text-[#292b2d] text-xs opacity-50 capitalize">
                  Cheese
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[#292b2d] text-base font-bold capitalize">
                    Pepper Jack
                  </div>
                  <div className="text-[#292b2d] text-base font-bold capitalize">
                    0.50 $
                  </div>
                </div>
              </div>

              {/* Add Ons */}
              <div className="space-y-[2px]">
                <div className="text-[#292b2d] text-xs opacity-50 capitalize">
                  Add Ons
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[#292b2d] text-base font-bold capitalize">
                    Avocado
                  </div>
                  <div className="text-[#292b2d] text-base font-bold capitalize">
                    0.50 $
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#ccc]"></div>

          {/* Total */}
          <div className="flex items-start gap-4">
            <div className="text-black text-base font-bold capitalize flex-1">
              Total
            </div>
            <div className="text-black text-base font-bold">US$13.18</div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Customer Info */}
      <div className="absolute left-0 top-[580px] w-full shadow-[0px_18px_32px_0px_rgba(156,163,175,0.15)]">
        <div className="bg-white rounded-t-[24px] px-5 py-5 space-y-6">
          <div className="h-[6px] flex justify-center items-center">
            <div className="w-[32px] h-[4px] bg-[#e5e7eb] rounded-full"></div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fb7ee5601c6e8447cbda74f8c8f572081%2F1cab340b73e84dda9b63b35a5e731f6d?format=webp&width=800"
                  alt="Customer avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="text-[#111827] text-base font-bold leading-5 capitalize">
                  James
                </div>
                <div className="text-[#7d8491] text-sm leading-5">
                  5 min. away
                </div>
              </div>
            </div>

            <button
              onClick={handleAccept}
              className="flex h-[45px] px-[26px] py-[10px] items-center gap-2 rounded-[100px] bg-[#05734a] text-[#cdf3e4] text-sm font-bold leading-5 capitalize"
            >
              Accept
            </button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleShowRejectModal}
              className="w-full h-[45px] flex items-center justify-center gap-2 rounded-[100px] border border-[#c92e03] text-[#c92e03] text-sm font-bold leading-5 capitalize"
            >
              Reject Order
            </button>
          </div>
        </div>
      </div>

      {/* Slide-up Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-[24px] px-5 py-5 space-y-5 animate-slide-up">
            <div className="h-[6px] flex justify-center items-center">
              <div className="w-[32px] h-[4px] bg-[#e5e7eb] rounded-full"></div>
            </div>

            <div className="space-y-[15px]">
              <h3 className="text-[#333] text-xl font-normal tracking-[0.313px] capitalize">
                Shipping Details
              </h3>

              {/* Delivery Address */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 flex items-center justify-center mt-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                        stroke="#6b6b6b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="9"
                        r="3"
                        stroke="#6b6b6b"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-black text-base font-normal leading-5">
                      San Francisco Bay Area
                    </div>
                    <div className="text-[#6b6b6b] text-sm font-normal leading-5">
                      CA
                    </div>
                  </div>
                </div>

                {/* Meet Instructions */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 flex items-center justify-center mt-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        stroke="#6b6b6b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="7"
                        r="4"
                        stroke="#6b6b6b"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-black text-base font-medium leading-5">
                      Meet at the door
                    </div>
                    <div className="text-[#05a357] text-sm font-normal leading-5">
                      Add delivery note
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleRejectOrder}
                className="w-full h-[45px] flex items-center justify-center gap-2 rounded-[100px] bg-[#c92e03] text-white text-sm font-bold leading-5 capitalize"
              >
                Confirm Reject Order
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className="w-full h-[45px] flex items-center justify-center gap-2 rounded-[100px] border border-[#e6e6e6] text-[#666] text-sm font-bold leading-5 capitalize"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OrderDetails;
