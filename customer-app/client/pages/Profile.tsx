import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";

const Profile = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-white w-full max-w-sm mx-auto relative">
      {/* Gradient Background */}
      <div
        className="w-full h-[170px] absolute left-0 top-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(80, 186, 108, 0.50) 0%, rgba(80, 186, 108, 0.00) 100%)",
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 px-5">
        {/* Profile Header */}
        <div className="pt-[60px] mb-[20px]">
          <h1 className="text-4xl font-bold text-black font-urbanist">
            Profile
          </h1>
        </div>

        {/* User Card */}
        <button
          onClick={() => navigate("/personal-info")}
          className="bg-white rounded-2xl border border-gray-200 p-5 mb-5 flex items-center gap-4 w-full text-left hover:bg-gray-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/38f3e89df7ad5fc0cee3bae4da187a8701dba961?width=168"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-500 capitalize font-urbanist">
              John Peters
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0719 3.15954C11.011 2.09867 9.57218 1.50269 8.07189 1.50269C6.5716 1.50269 5.13276 2.09867 4.07189 3.15954C3.01103 4.22041 2.41504 5.65925 2.41504 7.15954C2.41504 8.65983 3.01103 10.0987 4.07189 11.1595L7.58523 14.6795C7.6472 14.742 7.72094 14.7916 7.80218 14.8255C7.88342 14.8593 7.97055 14.8767 8.05856 14.8767C8.14657 14.8767 8.2337 14.8593 8.31494 14.8255C8.39618 14.7916 8.46992 14.742 8.53189 14.6795L12.0719 11.1262C13.1283 10.0698 13.7218 8.63691 13.7218 7.14287C13.7218 5.64884 13.1283 4.21599 12.0719 3.15954ZM11.1186 10.1729L8.07189 13.2329L5.02523 10.1729C4.42332 9.57042 4.01354 8.80304 3.84769 7.96773C3.68184 7.13243 3.76735 6.2667 4.09343 5.47999C4.41951 4.69328 4.9715 4.02091 5.67965 3.54786C6.38779 3.07481 7.22028 2.82233 8.07189 2.82233C8.9235 2.82233 9.756 3.07481 10.4641 3.54786C11.1723 4.02091 11.7243 4.69328 12.0504 5.47999C12.3764 6.2667 12.462 7.13243 12.2961 7.96773C12.1302 8.80304 11.7205 9.57042 11.1186 10.1729ZM6.07189 5.11287C5.5337 5.65272 5.23149 6.38392 5.23149 7.14621C5.23149 7.9085 5.5337 8.63969 6.07189 9.17954C6.47173 9.58007 6.98095 9.85359 7.53566 9.96581C8.09037 10.078 8.66586 10.0239 9.18994 9.81031C9.71402 9.59669 10.1633 9.23306 10.4815 8.76504C10.7997 8.29702 10.9726 7.74545 10.9786 7.17954C10.9816 6.80168 10.9088 6.42705 10.7645 6.0778C10.6202 5.72855 10.4074 5.41178 10.1386 5.14621C9.87434 4.87593 9.55928 4.66057 9.21151 4.51252C8.86374 4.36447 8.49012 4.28666 8.11216 4.28356C7.7342 4.28046 7.35936 4.35214 7.00921 4.49447C6.65906 4.63679 6.34051 4.84696 6.07189 5.11287ZM9.19856 8.23287C8.94592 8.48937 8.61203 8.65014 8.25398 8.68771C7.89592 8.72528 7.53594 8.6373 7.23556 8.43883C6.93519 8.24035 6.71309 7.9437 6.60723 7.5996C6.50137 7.25549 6.51833 6.8853 6.6552 6.55231C6.79207 6.21932 7.04036 5.94422 7.35762 5.77403C7.67487 5.60384 8.04139 5.54915 8.39452 5.61928C8.74764 5.68942 9.06543 5.88005 9.29357 6.15856C9.5217 6.43708 9.646 6.78619 9.64523 7.14621C9.63553 7.55772 9.46289 7.94856 9.16523 8.23287H9.19856Z"
                  fill="#9CA3AF"
                />
              </svg>
              <span className="text-xs text-gray-400 font-urbanist">
                4887 Southside Lane, Los Angeles, CA
              </span>
            </div>
          </div>
        </button>

        {/* Menu Items */}
        <div className="space-y-0">
          {/* Notifications */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 21.3032C9.79613 21.9062 10.8475 22.2729 12 22.2729C13.1525 22.2729 14.2039 21.9062 15 21.3032M3.57109 18.2001C3.09677 18.2001 2.83186 17.4936 3.11877 17.1011C3.78453 16.1903 4.42712 14.8544 4.42712 13.2457L4.45458 10.9146C4.45458 6.58376 7.83278 3.07288 12 3.07288C16.2286 3.07288 19.6566 6.63547 19.6566 11.0302L19.6291 13.2457C19.6291 14.8654 20.2495 16.2086 20.8882 17.1198C21.164 17.5133 20.8984 18.2001 20.43 18.2001H3.57109Z"
                  stroke="#00955D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-black font-urbanist capitalize">
                Notifications
              </span>
            </div>
            <div className="relative">
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-[52px] h-8 rounded-full transition-colors ${
                  notificationsEnabled ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-7 h-7 bg-white rounded-full transition-transform ${
                    notificationsEnabled ? "translate-x-6" : "translate-x-0.5"
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Wallet */}
          <button
            onClick={() => navigate("/wallet")}
            className="flex items-center justify-between py-3 w-full"
          >
            <div className="flex items-center gap-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5999 17.2329V18.2329C22.1522 18.2329 22.5999 17.7852 22.5999 17.2329H21.5999ZM21.5999 11.9529H22.5999C22.5999 11.4006 22.1522 10.9529 21.5999 10.9529V11.9529ZM7.13914 6.79169C6.67457 7.09034 6.54007 7.70905 6.83872 8.17362C7.13738 8.63819 7.75609 8.7727 8.22066 8.47405L7.13914 6.79169ZM14.3999 3.31287L15.1893 2.69893C14.8715 2.29038 14.2945 2.19181 13.8591 2.47169L14.3999 3.31287ZM16.9705 8.24681C17.3096 8.68275 17.9379 8.76129 18.3738 8.42222C18.8098 8.08315 18.8883 7.45487 18.5493 7.01893L16.9705 8.24681ZM21.5999 17.2329V16.2329H18.4799V17.2329V18.2329H21.5999V17.2329ZM18.4799 11.9529V12.9529H21.5999V11.9529V10.9529H18.4799V11.9529ZM21.5999 11.9529H20.5999V17.2329H21.5999H22.5999V11.9529H21.5999ZM15.8399 14.5929H16.8399C16.8399 13.6871 17.5742 12.9529 18.4799 12.9529V11.9529V10.9529C16.4696 10.9529 14.8399 12.5826 14.8399 14.5929H15.8399ZM18.4799 17.2329V16.2329C17.5742 16.2329 16.8399 15.4986 16.8399 14.5929H15.8399H14.8399C14.8399 16.6032 16.4696 18.2329 18.4799 18.2329V17.2329ZM7.6799 7.63287L8.22066 8.47405L14.9407 4.15404L14.3999 3.31287L13.8591 2.47169L7.13914 6.79169L7.6799 7.63287ZM14.3999 3.31287L13.6105 3.92681L16.9705 8.24681L17.7599 7.63287L18.5493 7.01893L15.1893 2.69893L14.3999 3.31287ZM3.3599 7.63287V8.63287H19.6799V7.63287V6.63287H3.3599V7.63287ZM19.6799 22.0329V21.0329H3.3599V22.0329V23.0329H19.6799V22.0329ZM2.3999 21.0729H3.3999V8.59287H2.3999H1.3999V21.0729H2.3999ZM3.3599 22.0329V21.0329C3.38199 21.0329 3.3999 21.0508 3.3999 21.0729H2.3999H1.3999C1.3999 22.1553 2.27742 23.0329 3.3599 23.0329V22.0329ZM20.6399 21.0729H19.6399C19.6399 21.0508 19.6578 21.0329 19.6799 21.0329V22.0329V23.0329C20.7624 23.0329 21.6399 22.1553 21.6399 21.0729H20.6399ZM19.6799 7.63287V8.63287C19.6578 8.63287 19.6399 8.61496 19.6399 8.59287H20.6399H21.6399C21.6399 7.51039 20.7624 6.63287 19.6799 6.63287V7.63287ZM3.3599 7.63287V6.63287C2.27742 6.63287 1.3999 7.51039 1.3999 8.59287H2.3999H3.3999C3.3999 8.61496 3.38199 8.63287 3.3599 8.63287V7.63287ZM20.6399 17.9529H19.6399V21.0729H20.6399H21.6399V17.9529H20.6399ZM20.6399 8.59287H19.6399V11.1129H20.6399H21.6399V8.59287H20.6399Z"
                  fill="#00955D"
                />
              </svg>
              <span className="text-sm text-black font-urbanist capitalize">
                Wallet
              </span>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5999 7.8728L14.3999 12.6728L9.5999 17.4728"
                stroke="#00955D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* My Subscriptions */}
          <button
            onClick={() => navigate("/subscriptions")}
            className="flex items-center justify-between py-3 w-full"
          >
            <div className="flex items-center gap-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.99968 9.97268H20.9997M6.59968 14.1727H9.59968M4.80015 5.77283H19.1998C20.5252 5.77283 21.5997 6.8465 21.5998 8.17196L21.6 17.1738C21.6001 18.4993 20.5255 19.5728 19.2001 19.5728L4.80038 19.5727C3.47493 19.5726 2.40044 18.4982 2.4004 17.1727L2.40015 8.17289C2.40011 6.84738 3.47464 5.77283 4.80015 5.77283Z"
                  stroke="#00955D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-black font-urbanist capitalize">
                My Subscriptions
              </span>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5999 7.8728L14.3999 12.6728L9.5999 17.4728"
                stroke="#00955D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Help & Support */}
          <button
            onClick={() => navigate("/help-support")}
            className="flex items-center justify-between py-3 w-full"
          >
            <div className="flex items-center gap-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5456 15.2185C13.1397 16.6244 10.8603 16.6244 9.45442 15.2185M14.5456 15.2185C15.9515 13.8126 15.9515 11.5332 14.5456 10.1273M14.5456 15.2185L18.364 19.0368M9.45442 15.2185C8.04853 13.8126 8.04853 11.5332 9.45442 10.1273M9.45442 15.2185L5.63604 19.0368M9.45442 10.1273C10.8603 8.72141 13.1397 8.72141 14.5456 10.1273M9.45442 10.1273L5.63604 6.30892M14.5456 10.1273L18.364 6.30892M18.7882 19.4611C15.0392 23.2101 8.96081 23.2101 5.21178 19.4611C1.46274 15.7121 1.46274 9.63369 5.21178 5.88466C8.96081 2.13563 15.0392 2.13563 18.7882 5.88466C22.5373 9.63369 22.5373 15.7121 18.7882 19.4611Z"
                  stroke="#00955D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-black font-urbanist capitalize">
                Help & Support
              </span>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5999 7.8728L14.3999 12.6728L9.5999 17.4728"
                stroke="#00955D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Terms & Policies */}
          <button
            onClick={() => navigate("/terms-policies")}
            className="flex items-center justify-between py-3 w-full"
          >
            <div className="flex items-center gap-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9999 12.6729V7.87288M11.9999 16.2307V16.2729M21.5999 12.6729C21.5999 17.9748 17.3018 22.2729 11.9999 22.2729C6.69797 22.2729 2.3999 17.9748 2.3999 12.6729C2.3999 7.37094 6.69797 3.07288 11.9999 3.07288C17.3018 3.07288 21.5999 7.37094 21.5999 12.6729Z"
                  stroke="#00955D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-black font-urbanist capitalize">
                Terms & Policies
              </span>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5999 7.8728L14.3999 12.6728L9.5999 17.4728"
                stroke="#00955D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-3 w-full py-4 text-red-500 font-urbanist font-medium"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Log Out
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Profile;
