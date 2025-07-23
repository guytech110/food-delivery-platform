import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "John Peters",
    email: "johnpeters@email.com",
    phone: "+1 (555) 123-4567",
    address: "4887 Southside Lane, Los Angeles, CA",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
  };

  return (
    <div className="min-h-screen bg-white w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-5 pt-[60px]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-black font-urbanist">
          Personal Information
        </h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm font-medium text-primary font-urbanist"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Profile Picture Section */}
      <div className="px-5 mb-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/38f3e89df7ad5fc0cee3bae4da187a8701dba961?width=168"
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7 6.3C15.1 5.9 15.1 5.3 14.7 4.9C14.3 4.5 13.7 4.5 13.3 4.9L12 6.2L10.7 4.9C10.3 4.5 9.7 4.5 9.3 4.9C8.9 5.3 8.9 5.9 9.3 6.3L10.6 7.6L9.3 8.9C8.9 9.3 8.9 9.9 9.3 10.3C9.7 10.7 10.3 10.7 10.7 10.3L12 9L13.3 10.3C13.7 10.7 14.3 10.7 14.7 10.3C15.1 9.9 15.1 9.3 14.7 8.9L13.4 7.6L14.7 6.3Z"
                    fill="white"
                  />
                  <path
                    d="M9 9L15 15M15 9L9 15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
          {isEditing && (
            <button className="text-sm text-primary font-urbanist font-medium">
              Change Profile Picture
            </button>
          )}
        </div>
      </div>

      {/* Information Fields */}
      <div className="px-5 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2 font-urbanist">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              className="w-full p-4 border border-gray-200 rounded-2xl text-sm font-urbanist focus:outline-none focus:border-primary"
            />
          ) : (
            <div className="w-full p-4 bg-gray-50 rounded-2xl text-sm text-black font-urbanist">
              {userInfo.name}
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2 font-urbanist">
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className="w-full p-4 border border-gray-200 rounded-2xl text-sm font-urbanist focus:outline-none focus:border-primary"
            />
          ) : (
            <div className="w-full p-4 bg-gray-50 rounded-2xl text-sm text-black font-urbanist">
              {userInfo.email}
            </div>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2 font-urbanist">
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={userInfo.phone}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
              className="w-full p-4 border border-gray-200 rounded-2xl text-sm font-urbanist focus:outline-none focus:border-primary"
            />
          ) : (
            <div className="w-full p-4 bg-gray-50 rounded-2xl text-sm text-black font-urbanist">
              {userInfo.phone}
            </div>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2 font-urbanist">
            Address
          </label>
          {isEditing ? (
            <textarea
              value={userInfo.address}
              onChange={(e) =>
                setUserInfo({ ...userInfo, address: e.target.value })
              }
              rows={3}
              className="w-full p-4 border border-gray-200 rounded-2xl text-sm font-urbanist focus:outline-none focus:border-primary resize-none"
            />
          ) : (
            <div className="w-full p-4 bg-gray-50 rounded-2xl text-sm text-black font-urbanist">
              {userInfo.address}
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="px-5 mt-8 mb-8">
          <button
            onClick={handleSave}
            className="w-full bg-primary text-white py-4 rounded-2xl text-sm font-medium font-urbanist"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
