import React from "react";
import { useNavigate } from "react-router-dom";

const TermsPolicies = () => {
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
          Terms & Policies
        </h1>
        <div className="w-8"></div>
      </div>

      {/* Content */}
      <div className="mx-5 space-y-4">
        {/* Terms of Service */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
                  fill="#00955D"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-black font-urbanist">
                Terms of Service
              </h3>
              <p className="text-sm text-gray-600 font-urbanist">
                Last updated: Dec 2023
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-3 font-urbanist">
            By using HomeTaste, you agree to our terms of service. These terms
            outline your rights and responsibilities when using our platform.
          </p>
          <button className="text-primary font-medium text-sm font-urbanist">
            Read Full Terms →
          </button>
        </div>

        {/* Privacy Policy */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 21C7.59 19.8 4 15.69 4 11V6.09L12 2.87L20 6.09V11C20 15.69 16.41 19.8 12 21Z"
                  fill="#3B82F6"
                />
                <path
                  d="M10.5 13.5L8.5 11.5L7.5 12.5L10.5 15.5L16.5 9.5L15.5 8.5L10.5 13.5Z"
                  fill="#3B82F6"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-black font-urbanist">
                Privacy Policy
              </h3>
              <p className="text-sm text-gray-600 font-urbanist">
                Last updated: Dec 2023
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-3 font-urbanist">
            We protect your privacy and handle your data responsibly. Learn how
            we collect, use, and safeguard your information.
          </p>
          <button className="text-primary font-medium text-sm font-urbanist">
            Read Privacy Policy →
          </button>
        </div>

        {/* Refund Policy */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 10.1 9.9 11 11 11V22H13V11C14.1 11 15 10.1 15 9Z"
                  fill="#F97316"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-black font-urbanist">
                Refund Policy
              </h3>
              <p className="text-sm text-gray-600 font-urbanist">
                Last updated: Dec 2023
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-3 font-urbanist">
            Understand our refund and cancellation policies for orders,
            including conditions and timeframes for refunds.
          </p>
          <button className="text-primary font-medium text-sm font-urbanist">
            Read Refund Policy →
          </button>
        </div>

        {/* Community Guidelines */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM8 6C9.66 6 11 7.34 11 9C11 10.66 9.66 12 8 12C6.34 12 5 10.66 5 9C5 7.34 6.34 6 8 6ZM8 13C10.67 13 16 14.33 16 17V20H0V17C0 14.33 5.33 13 8 13ZM16 13C16.03 13 16.05 13 16.08 13.01C17.2 13.72 18 14.8 18 17V20H22V17C22 14.33 18.67 13 16 13Z"
                  fill="#8B5CF6"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-black font-urbanist">
                Community Guidelines
              </h3>
              <p className="text-sm text-gray-600 font-urbanist">
                Last updated: Dec 2023
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-3 font-urbanist">
            Guidelines for respectful interaction within our community features
            and review system.
          </p>
          <button className="text-primary font-medium text-sm font-urbanist">
            Read Guidelines →
          </button>
        </div>

        {/* Cookie Policy */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM8 12C8.55 12 9 12.45 9 13C9 13.55 8.55 14 8 14C7.45 14 7 13.55 7 13C7 12.45 7.45 12 8 12ZM16 12C16.55 12 17 12.45 17 13C17 13.55 16.55 14 16 14C15.45 14 15 13.55 15 13C15 12.45 15.45 12 16 12ZM10 16C10.55 16 11 16.45 11 17C11 17.55 10.55 18 10 18C9.45 18 9 17.55 9 17C9 16.45 9.45 16 10 16ZM14 16C14.55 16 15 16.45 15 17C15 17.55 14.55 18 14 18C13.45 18 13 17.55 13 17C13 16.45 13.45 16 14 16Z"
                  fill="#EAB308"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-black font-urbanist">
                Cookie Policy
              </h3>
              <p className="text-sm text-gray-600 font-urbanist">
                Last updated: Dec 2023
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-3 font-urbanist">
            Learn about how we use cookies and similar technologies to improve
            your experience on our platform.
          </p>
          <button className="text-primary font-medium text-sm font-urbanist">
            Read Cookie Policy →
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mx-5 mt-6 mb-8">
        <div className="bg-gray-50 rounded-2xl p-5 text-center">
          <h3 className="font-semibold text-black mb-2 font-urbanist">
            Have Questions?
          </h3>
          <p className="text-sm text-gray-600 mb-4 font-urbanist">
            If you have any questions about our terms and policies, feel free to
            contact us.
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold font-urbanist">
            Contact Legal Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsPolicies;
