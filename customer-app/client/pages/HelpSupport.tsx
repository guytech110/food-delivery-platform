import React from "react";
import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      question: "How do I place an order?",
      answer:
        "You can place an order by browsing our menu, selecting items, and proceeding to checkout.",
    },
    {
      question: "What are the delivery charges?",
      answer:
        "Delivery charges vary based on distance and are displayed before you place your order.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order in real-time through the Orders section in the app.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, debit cards, digital wallets, and cash on delivery.",
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
          Help & Support
        </h1>
        <div className="w-8"></div>
      </div>

      {/* Contact Options */}
      <div className="mx-5 mb-6">
        <h2 className="text-lg font-semibold text-black mb-4 font-urbanist">
          Contact Us
        </h2>

        <div className="space-y-3">
          <button className="w-full bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35833 20.8583L2 22L3.14167 16.6417C2.39609 15.2248 2 13.6404 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-black font-urbanist">
                Live Chat
              </p>
              <p className="text-sm text-gray-600 font-urbanist">
                Chat with our support team
              </p>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="#00955D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button className="w-full bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 13L4 6H20Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-black font-urbanist">Email Us</p>
              <p className="text-sm text-gray-600 font-urbanist">
                support@hometaste.com
              </p>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="#00955D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button className="w-full bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C10.93 21 3 13.07 3 3.08C3 2.48 3.48 2 4.08 2H7.09C7.69 2 8.17 2.48 8.17 3.08C8.17 4.58 8.45 6.02 8.96 7.34C9.09 7.64 9.01 8 8.76 8.25L7.25 9.76C8.58 12.37 10.63 14.42 13.24 15.75L14.75 14.24C15 13.99 15.36 13.91 15.66 14.04C16.98 14.55 18.42 14.83 19.92 14.83C20.52 14.83 21 15.31 21 15.91V18.92H22Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-black font-urbanist">Call Us</p>
              <p className="text-sm text-gray-600 font-urbanist">
                +1 (555) 123-4567
              </p>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="#00955D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-5">
        <h2 className="text-lg font-semibold text-black mb-4 font-urbanist">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-black font-urbanist">
                  {item.question}
                </h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mt-2 font-urbanist">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Ticket Button */}
      <div className="mx-5 mt-6 mb-8">
        <button className="w-full bg-primary text-white py-4 rounded-2xl font-semibold font-urbanist">
          Submit a Support Ticket
        </button>
      </div>
    </div>
  );
};

export default HelpSupport;
