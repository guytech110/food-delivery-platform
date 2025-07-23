import React from "react";
import { useNavigate } from "react-router-dom";

const Subscriptions = () => {
  const navigate = useNavigate();

  const subscriptions = [
    {
      id: 1,
      name: "Premium Plus",
      description: "Unlimited free delivery + exclusive deals",
      price: "$9.99/month",
      status: "Active",
      nextBilling: "Jan 15, 2024",
      color: "bg-gradient-to-r from-green-400 to-green-600",
    },
  ];

  const availablePlans = [
    {
      id: 2,
      name: "Basic Plan",
      description: "Free delivery on orders over $25",
      price: "$4.99/month",
      features: ["Free delivery on orders $25+", "Priority support"],
    },
    {
      id: 3,
      name: "Family Plan",
      description: "Perfect for families with multiple orders",
      price: "$14.99/month",
      features: [
        "Unlimited free delivery",
        "Family sharing (up to 4 members)",
        "Exclusive family deals",
        "Priority support",
      ],
    },
  ];

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
          My Subscriptions
        </h1>
        <div className="w-8"></div>
      </div>

      {/* Current Subscriptions */}
      <div className="mx-5 mb-6">
        <h2 className="text-lg font-semibold text-black mb-4 font-urbanist">
          Active Subscriptions
        </h2>

        {subscriptions.length > 0 ? (
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className={`${sub.color} rounded-2xl p-5 text-white`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold font-urbanist">
                      {sub.name}
                    </h3>
                    <p className="text-sm opacity-90 font-urbanist">
                      {sub.description}
                    </p>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium font-urbanist">
                      {sub.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold font-urbanist">
                      {sub.price}
                    </p>
                    <p className="text-sm opacity-80 font-urbanist">
                      Next billing: {sub.nextBilling}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-white/20 px-4 py-2 rounded-xl text-sm font-medium font-urbanist">
                      Manage
                    </button>
                    <button className="bg-white text-green-600 px-4 py-2 rounded-xl text-sm font-medium font-urbanist">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-gray-200 rounded-2xl">
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
              No Active Subscriptions
            </h3>
            <p className="text-sm text-gray-600 font-urbanist">
              Subscribe to a plan to enjoy exclusive benefits
            </p>
          </div>
        )}
      </div>

      {/* Subscription Benefits */}
      <div className="mx-5 mb-6">
        <h2 className="text-lg font-semibold text-black mb-4 font-urbanist">
          Subscription Benefits
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-black font-urbanist">
                Free delivery on all orders
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-black font-urbanist">
                Exclusive deals and discounts
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-black font-urbanist">
                Priority customer support
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-black font-urbanist">
                Early access to new features
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="mx-5 mb-8">
        <h2 className="text-lg font-semibold text-black mb-4 font-urbanist">
          Available Plans
        </h2>

        <div className="space-y-4">
          {availablePlans.map((plan) => (
            <div
              key={plan.id}
              className="border border-gray-200 rounded-2xl p-5"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-black font-urbanist">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-urbanist">
                    {plan.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary font-urbanist">
                    {plan.price}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="#00955D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 font-urbanist">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full border border-primary text-primary py-3 rounded-xl font-semibold font-urbanist hover:bg-primary hover:text-white transition-colors">
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
