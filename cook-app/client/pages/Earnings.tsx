import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Earnings: React.FC = () => {
  const navigate = useNavigate();
  const [showCashOutModal, setShowCashOutModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    accountHolderName: "Sarah Johnson",
    bankName: "Chase Bank",
    accountNumber: "****1234",
    routingNumber: "****5678",
  });

  const handleCashOut = () => {
    setShowCashOutModal(true);
  };

  const confirmCashOut = () => {
    // Handle cash out logic
    console.log("Processing cash out...");
    setShowCashOutModal(false);
  };

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      date: "Sept 21, 2024",
      description: "Order from James",
      amount: "+$127.00",
      type: "earning",
    },
    {
      id: 2,
      date: "Sept 21, 2024",
      description: "Order from Sarah",
      amount: "+$89.50",
      type: "earning",
    },
    {
      id: 3,
      date: "Sept 20, 2024",
      description: "Cash out to bank",
      amount: "-$250.00",
      type: "cashout",
    },
    {
      id: 4,
      date: "Sept 20, 2024",
      description: "Order from Michael",
      amount: "+$156.75",
      type: "earning",
    },
    {
      id: 5,
      date: "Sept 19, 2024",
      description: "Order from Lisa",
      amount: "+$98.25",
      type: "earning",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-urbanist pb-[85px]">
      {/* Header */}
      <div className="w-full h-[170px] bg-gradient-to-b from-[rgba(80,186,108,0.50)] to-[rgba(80,186,108,0.00)] relative">
        <h1 className="absolute left-5 top-[60px] text-black text-4xl font-semibold capitalize">
          Earnings
        </h1>
      </div>

      {/* Main Content */}
      <div className="px-5 pt-[40px] pb-8">
        {/* Available Balance Card */}
        <div className="bg-gradient-to-r from-[#abe57d] to-[#00955d] rounded-[16px] p-6 mb-6 text-white">
          <div className="space-y-4">
            <div>
              <p className="text-white/80 text-sm font-medium">
                Available Balance
              </p>
              <h2 className="text-3xl font-bold">$421.50</h2>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-white/80 text-xs">This Week</p>
                <p className="text-lg font-semibold">$372.25</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/80 text-xs">Total Orders</p>
                <p className="text-lg font-semibold">24</p>
              </div>
            </div>

            <button
              onClick={handleCashOut}
              className="w-full bg-white text-[#00955d] py-3 rounded-[12px] font-semibold text-base"
            >
              Cash Out
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#f8f9fa] rounded-[16px] p-4 text-center">
            <div className="text-2xl font-bold text-[#00955d] mb-1">$89.50</div>
            <div className="text-sm text-[#5e5e5e]">Today's Earnings</div>
          </div>
          <div className="bg-[#f8f9fa] rounded-[16px] p-4 text-center">
            <div className="text-2xl font-bold text-[#00955d] mb-1">4.8</div>
            <div className="text-sm text-[#5e5e5e]">Average Rating</div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-[#191919]">
              Recent Transactions
            </h3>
            <button className="text-[#00955d] text-sm font-medium">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-[12px]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "earning"
                        ? "bg-[#00955d]/10"
                        : "bg-[#f59e0b]/10"
                    }`}
                  >
                    {transaction.type === "earning" ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                          fill="#00955d"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2Z"
                          fill="#f59e0b"
                        />
                        <path
                          d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21"
                          stroke="#f59e0b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-[#191919] text-sm font-medium">
                      {transaction.description}
                    </p>
                    <p className="text-[#5e5e5e] text-xs">{transaction.date}</p>
                  </div>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    transaction.type === "earning"
                      ? "text-[#00955d]"
                      : "text-[#f59e0b]"
                  }`}
                >
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Information Section */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-[#191919]">
              Bank Information
            </h3>
            <button
              onClick={() => setShowBankModal(true)}
              className="text-[#00955d] text-sm font-medium"
            >
              Edit
            </button>
          </div>

          <div className="bg-[#f8f9fa] rounded-[16px] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#5e5e5e] text-sm">Account Holder</span>
              <span className="text-[#191919] font-medium">
                {bankInfo.accountHolderName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#5e5e5e] text-sm">Bank Name</span>
              <span className="text-[#191919] font-medium">
                {bankInfo.bankName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#5e5e5e] text-sm">Account Number</span>
              <span className="text-[#191919] font-medium">
                {bankInfo.accountNumber}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#5e5e5e] text-sm">Routing Number</span>
              <span className="text-[#191919] font-medium">
                {bankInfo.routingNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-[#f0f9ff] rounded-[16px] p-4">
          <h4 className="text-[#191919] font-semibold mb-2">💡 Pro Tip</h4>
          <p className="text-[#5e5e5e] text-sm">
            Cash out regularly to keep your earnings secure. Instant cash out is
            available for a small fee, or choose free standard transfer (1-3
            business days).
          </p>
        </div>
      </div>

      {/* Cash Out Modal */}
      {showCashOutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-[24px] px-5 py-5 space-y-5 animate-slide-up">
            <div className="h-[6px] flex justify-center items-center">
              <div className="w-[32px] h-[4px] bg-[#e5e7eb] rounded-full"></div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#333] text-xl font-semibold text-center">
                Cash Out
              </h3>

              <div className="text-center space-y-2">
                <p className="text-[#5e5e5e] text-sm">Available Balance</p>
                <p className="text-3xl font-bold text-[#00955d]">$421.50</p>
              </div>

              <div className="space-y-3">
                <div className="border border-[#e6e6e6] rounded-[12px] p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#191919] font-medium">
                      Instant Cash Out
                    </span>
                    <span className="text-[#5e5e5e] text-sm">$1.50 fee</span>
                  </div>
                  <p className="text-[#5e5e5e] text-xs">
                    Get your money in minutes
                  </p>
                </div>

                <div className="border border-[#e6e6e6] rounded-[12px] p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#191919] font-medium">
                      Standard Transfer
                    </span>
                    <span className="text-[#00955d] text-sm font-medium">
                      Free
                    </span>
                  </div>
                  <p className="text-[#5e5e5e] text-xs">
                    1-3 business days to your bank
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={confirmCashOut}
                  className="w-full h-[45px] bg-[#00955d] text-white rounded-[12px] font-semibold"
                >
                  Confirm Cash Out
                </button>
                <button
                  onClick={() => setShowCashOutModal(false)}
                  className="w-full h-[45px] border border-[#e6e6e6] text-[#666] rounded-[12px] font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bank Information Modal */}
      {showBankModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-[24px] px-5 py-5 space-y-5 animate-slide-up">
            <div className="h-[6px] flex justify-center items-center">
              <div className="w-[32px] h-[4px] bg-[#e5e7eb] rounded-full"></div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#333] text-xl font-semibold text-center">
                Edit Bank Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-[#5e5e5e] text-sm block mb-2">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={bankInfo.accountHolderName}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        accountHolderName: e.target.value,
                      })
                    }
                    className="w-full border border-[#e6e6e6] rounded-[12px] p-3 text-[#191919] font-medium"
                    placeholder="Enter account holder name"
                  />
                </div>

                <div>
                  <label className="text-[#5e5e5e] text-sm block mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={bankInfo.bankName}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankName: e.target.value,
                      })
                    }
                    className="w-full border border-[#e6e6e6] rounded-[12px] p-3 text-[#191919] font-medium"
                    placeholder="Enter bank name"
                  />
                </div>

                <div>
                  <label className="text-[#5e5e5e] text-sm block mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={bankInfo.accountNumber}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        accountNumber: e.target.value,
                      })
                    }
                    className="w-full border border-[#e6e6e6] rounded-[12px] p-3 text-[#191919] font-medium"
                    placeholder="Enter account number"
                  />
                </div>

                <div>
                  <label className="text-[#5e5e5e] text-sm block mb-2">
                    Routing Number
                  </label>
                  <input
                    type="text"
                    value={bankInfo.routingNumber}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        routingNumber: e.target.value,
                      })
                    }
                    className="w-full border border-[#e6e6e6] rounded-[12px] p-3 text-[#191919] font-medium"
                    placeholder="Enter routing number"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={() => setShowBankModal(false)}
                  className="w-full h-[45px] bg-[#00955d] text-white rounded-[12px] font-semibold"
                >
                  Save Bank Information
                </button>
                <button
                  onClick={() => setShowBankModal(false)}
                  className="w-full h-[45px] border border-[#e6e6e6] text-[#666] rounded-[12px] font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 w-full h-[85px] bg-white border-t border-[#f2f2f2] flex items-center justify-center px-[18px] py-[6px]">
        <div className="flex w-full max-w-[400px] justify-between items-center h-[72px]">
          {/* Home */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex flex-col items-center justify-center gap-[6px] flex-1 py-[12.5px] px-[8px]"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.79688 3.81476C11.05 2.84403 13.035 2.73587 14.4238 3.52863L14.6934 3.69952L20.4541 7.7298C20.9232 8.05826 21.367 8.59692 21.6943 9.22394C22.0218 9.85112 22.2099 10.5242 22.21 11.0999V17.8802C22.2099 20.1538 20.3644 22.0001 18.0908 22.0003H7.31055C5.03824 22.0003 3.19066 20.1455 3.19043 17.8704V10.97L3.19824 10.765C3.23493 10.2763 3.39826 9.72066 3.65918 9.19073C3.95722 8.58546 4.36168 8.05653 4.78809 7.72394L9.79688 3.81476ZM12.7002 14.2503C12.0142 14.2504 11.4502 14.8142 11.4502 15.5003V18.5003C11.4504 19.1862 12.0143 19.7502 12.7002 19.7503C13.3862 19.7503 13.95 19.1863 13.9502 18.5003V15.5003C13.9502 14.8142 13.3863 14.2503 12.7002 14.2503Z"
                stroke="#A5A5A5"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <div className="text-[#A5A5A5] text-sm font-medium">Home</div>
          </button>

          {/* Orders */}
          <button
            onClick={() => navigate("/orders")}
            className="flex flex-col items-center justify-center gap-[6px] flex-1 py-[12.5px] px-[8px]"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.22559 22.8748H23.2256"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 20.172C2.90395 17.871 4.10188 15.7844 5.88534 14.2753C7.6688 12.7662 9.92491 11.9302 12.2611 11.9127C14.5925 11.9181 16.8462 12.7515 18.6203 14.2643C20.3943 15.777 21.5734 17.8707 21.9471 20.172"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.2608 11.8369C13.339 11.8369 14.213 10.9628 14.213 9.88466C14.213 8.80648 13.339 7.93243 12.2608 7.93243C11.1826 7.93243 10.3086 8.80648 10.3086 9.88466C10.3086 10.9628 11.1826 11.8369 12.2608 11.8369Z"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.2617 2.00039V4.77853"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.48047 3.87668V6.57975"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.0439 3.87668V6.57975"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-[#A5A5A5] text-sm font-medium">Orders</div>
          </button>

          {/* Menu */}
          <button
            onClick={() => navigate("/menu")}
            className="flex flex-col items-center justify-center gap-[6px] flex-1 py-[12.5px] px-[8px]"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.4789 3.5V15.4438H15.082V7.89688C15.082 6.73076 15.5453 5.61238 16.3698 4.78781C17.1944 3.96323 18.3128 3.5 19.4789 3.5Z"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.9199 15.3778H19.4793V20.8903C19.4793 21.2209 19.3479 21.5381 19.1141 21.7719C18.8803 22.0058 18.5631 22.1371 18.2324 22.1371H18.1668C17.8361 22.1371 17.519 22.0058 17.2851 21.7719C17.0513 21.5381 16.9199 21.2209 16.9199 20.8903V15.3778Z"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.51913 22.1411C8.11882 22.1411 7.73491 21.9821 7.45185 21.699C7.16878 21.416 7.00977 21.0321 7.00977 20.6318L7.66602 12.4286H9.43788L10.0941 20.6318C10.0943 20.8356 10.0532 21.0374 9.9733 21.2249C9.89338 21.4125 9.77628 21.5819 9.6291 21.7229C9.48191 21.864 9.30769 21.9738 9.11692 22.0456C8.92615 22.1175 8.7228 22.15 8.51913 22.1411Z"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.4719 9.47549C11.3655 10.1913 11.0054 10.8451 10.4573 11.3178C9.90927 11.7904 9.20966 12.0504 8.48595 12.0504C7.76224 12.0504 7.06261 11.7904 6.51454 11.3178C5.96646 10.8451 5.60641 10.1913 5.5 9.47549H11.4719Z"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.5 4.02788V9.47476"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.45312 4.02788V9.34351"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.4717 4.02788V9.47476"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-[#A5A5A5] text-sm font-medium">Menu</div>
          </button>

          {/* Earnings - Active */}
          <div className="flex flex-col items-center justify-center gap-[6px] flex-1 py-[12.5px] px-[8px]">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.40997 3.77208C8.96039 3.84333 8.65039 4.23583 8.65039 4.69167C8.65037 5.27729 8.82312 5.84991 9.14701 6.33782C9.4709 6.82572 9.93153 7.20724 10.4712 7.43458C7.22581 8.8675 4.90039 12.5987 4.90039 15.6875C4.90039 19.5996 8.63122 21 13.2337 21C17.8362 21 21.5671 19.5996 21.5671 15.6875C21.5671 12.5987 19.2408 8.8675 15.9962 7.43417C16.5359 7.20682 16.9966 6.82531 17.3204 6.3374C17.6443 5.84949 17.8171 5.27688 17.8171 4.69125C17.8171 4.23583 17.5071 3.84333 17.0575 3.77208C16.2991 3.65167 14.9941 3.5 13.2337 3.5C11.4733 3.5 10.1679 3.65167 9.40997 3.77208Z"
                stroke="#00955D"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#00955D"
              />
              <path
                d="M15.7334 11.4618C15.7334 11.4618 14.7334 10.7923 13.2334 10.7923C11.9834 10.7923 10.7334 11.4618 10.7334 12.3548C10.7334 14.5868 15.7334 13.2477 15.7334 15.4798C15.7334 16.3727 14.4834 17.0423 13.2334 17.0423C11.7334 17.0423 10.7334 16.3727 10.7334 16.3727"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.2334 10.7917V9.75"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.2334 18.0839V17.0423"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-[#00955d] text-sm font-medium">Earnings</div>
          </div>

          {/* Community */}
          <button
            onClick={() => navigate("/community")}
            className="flex flex-col items-center justify-center gap-[6px] flex-1 py-[12.5px] px-[8px]"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0998 18.4496L15.5921 14.315H13.3767L11.8998 12.8381L14.8536 8.4073H20.0229M6.73057 4.715L8.29699 6.28141C9.13868 7.12311 9.39778 8.38543 8.9557 9.49063V9.49063C8.50381 10.6204 7.40964 11.3611 6.19289 11.3611H3.03827M21.4998 12.0996C21.4998 17.4015 17.2017 21.6996 11.8998 21.6996C6.59787 21.6996 2.2998 17.4015 2.2998 12.0996C2.2998 6.79768 6.59787 2.49961 11.8998 2.49961C17.2017 2.49961 21.4998 6.79768 21.4998 12.0996Z"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-[#A5A5A5] text-sm font-medium">Community</div>
          </button>
        </div>
      </div>

      <style>{`
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

export default Earnings;
