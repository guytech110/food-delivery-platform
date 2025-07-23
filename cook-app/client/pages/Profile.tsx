import React, { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Mock cook data - this would typically come from a database/API
  const [cookData, setCookData] = useState({
    personalInfo: {
      fullName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1990-05-15",
      address: "123 Main Street, New York, NY 10001",
    },
    businessInfo: {
      kitchenName: "Sarah's Kitchen",
      businessType: "Home Kitchen",
      description:
        "Specializing in authentic Italian cuisine with a modern twist. Fresh ingredients and traditional recipes passed down through generations.",
      cuisineTypes: ["Italian", "Mediterranean", "Vegetarian"],
      yearsOfExperience: "5",
      certifications: ["Food Safety Certification", "Culinary Arts Diploma"],
    },
    documents: {
      businessLicense: "Verified ✓",
      foodHandlingPermit: "Verified ✓",
      insuranceCertificate: "Verified ✓",
    },
    statistics: {
      totalOrders: 247,
      averageRating: 4.8,
      joinDate: "March 2024",
    },
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save logic would go here
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white font-urbanist pb-[85px]">
      {/* Header */}
      <div className="w-full h-[170px] bg-gradient-to-b from-[rgba(80,186,108,0.50)] to-[rgba(80,186,108,0.00)] relative">
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute left-5 top-[60px] w-10 h-10 flex items-center justify-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M12 19L5 12L12 5"
              stroke="#191919"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 top-[60px] text-black text-2xl font-semibold">
          Profile
        </h1>

        <button
          onClick={handleEdit}
          className="absolute right-5 top-[60px] text-[#00955d] text-sm font-medium"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Main Content */}
      <div className="px-5 pt-[40px] pb-8">
        {/* Profile Picture & Basic Info */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-[#abe57d] to-[#00955d] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {cookData.personalInfo.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#191919]">
              {cookData.personalInfo.fullName}
            </h2>
            <p className="text-[#5e5e5e] text-sm">
              {cookData.businessInfo.kitchenName}
            </p>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="#00955d"
                  />
                </svg>
                <span className="text-[#00955d] text-sm font-medium">
                  {cookData.statistics.averageRating}
                </span>
              </div>
              <span className="text-[#5e5e5e] text-sm">•</span>
              <span className="text-[#5e5e5e] text-sm">
                {cookData.statistics.totalOrders} orders
              </span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#191919] mb-4">
            Personal Information
          </h3>
          <div className="space-y-4">
            <div className="bg-[#f8f9fa] rounded-[12px] p-4">
              <label className="text-[#5e5e5e] text-sm">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={cookData.personalInfo.fullName}
                  onChange={(e) =>
                    setCookData({
                      ...cookData,
                      personalInfo: {
                        ...cookData.personalInfo,
                        fullName: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-transparent text-[#191919] font-medium mt-1 border-none outline-none"
                />
              ) : (
                <p className="text-[#191919] font-medium">
                  {cookData.personalInfo.fullName}
                </p>
              )}
            </div>

            <div className="bg-[#f8f9fa] rounded-[12px] p-4">
              <label className="text-[#5e5e5e] text-sm">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={cookData.personalInfo.email}
                  onChange={(e) =>
                    setCookData({
                      ...cookData,
                      personalInfo: {
                        ...cookData.personalInfo,
                        email: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-transparent text-[#191919] font-medium mt-1 border-none outline-none"
                />
              ) : (
                <p className="text-[#191919] font-medium">
                  {cookData.personalInfo.email}
                </p>
              )}
            </div>

            <div className="bg-[#f8f9fa] rounded-[12px] p-4">
              <label className="text-[#5e5e5e] text-sm">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={cookData.personalInfo.phone}
                  onChange={(e) =>
                    setCookData({
                      ...cookData,
                      personalInfo: {
                        ...cookData.personalInfo,
                        phone: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-transparent text-[#191919] font-medium mt-1 border-none outline-none"
                />
              ) : (
                <p className="text-[#191919] font-medium">
                  {cookData.personalInfo.phone}
                </p>
              )}
            </div>

            <div className="bg-[#f8f9fa] rounded-[12px] p-4">
              <label className="text-[#5e5e5e] text-sm">Address</label>
              {isEditing ? (
                <textarea
                  value={cookData.personalInfo.address}
                  onChange={(e) =>
                    setCookData({
                      ...cookData,
                      personalInfo: {
                        ...cookData.personalInfo,
                        address: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-transparent text-[#191919] font-medium mt-1 border-none outline-none resize-none"
                  rows={2}
                />
              ) : (
                <p className="text-[#191919] font-medium">
                  {cookData.personalInfo.address}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#191919] mb-4">
            Business Information
          </h3>
          <div className="space-y-4">
            <div className="bg-[#f8f9fa] rounded-[12px] p-4">
              <label className="text-[#5e5e5e] text-sm">Kitchen Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={cookData.businessInfo.kitchenName}
                  onChange={(e) =>
                    setCookData({
                      ...cookData,
                      businessInfo: {
                        ...cookData.businessInfo,
                        kitchenName: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-transparent text-[#191919] font-medium mt-1 border-none outline-none"
                />
              ) : (
                <p className="text-[#191919] font-medium">
                  {cookData.businessInfo.kitchenName}
                </p>
              )}
            </div>

            <div className="bg-[#f8f9fa] rounded-[12px] p-4">
              <label className="text-[#5e5e5e] text-sm">Description</label>
              {isEditing ? (
                <textarea
                  value={cookData.businessInfo.description}
                  onChange={(e) =>
                    setCookData({
                      ...cookData,
                      businessInfo: {
                        ...cookData.businessInfo,
                        description: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-transparent text-[#191919] font-medium mt-1 border-none outline-none resize-none"
                  rows={3}
                />
              ) : (
                <p className="text-[#191919] font-medium">
                  {cookData.businessInfo.description}
                </p>
              )}
            </div>

            <div className="bg-[#f8f9fa] rounded-[12px] p-4">
              <label className="text-[#5e5e5e] text-sm">Cuisine Types</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {cookData.businessInfo.cuisineTypes.map((cuisine, index) => (
                  <span
                    key={index}
                    className="bg-[#00955d] text-white px-3 py-1 rounded-full text-sm"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[12px] p-4">
              <label className="text-[#5e5e5e] text-sm">
                Years of Experience
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={cookData.businessInfo.yearsOfExperience}
                  onChange={(e) =>
                    setCookData({
                      ...cookData,
                      businessInfo: {
                        ...cookData.businessInfo,
                        yearsOfExperience: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-transparent text-[#191919] font-medium mt-1 border-none outline-none"
                />
              ) : (
                <p className="text-[#191919] font-medium">
                  {cookData.businessInfo.yearsOfExperience} years
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Document Verification Status */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#191919] mb-4">
            Document Verification
          </h3>
          <div className="space-y-3">
            {Object.entries(cookData.documents).map(([key, status]) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-[12px]"
              >
                <span className="text-[#191919] font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="text-[#00955d] text-sm font-medium">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#191919] mb-4">
            Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#f8f9fa] rounded-[16px] p-4 text-center">
              <div className="text-2xl font-bold text-[#00955d] mb-1">
                {cookData.statistics.totalOrders}
              </div>
              <div className="text-sm text-[#5e5e5e]">Total Orders</div>
            </div>
            <div className="bg-[#f8f9fa] rounded-[16px] p-4 text-center">
              <div className="text-2xl font-bold text-[#00955d] mb-1">
                {cookData.statistics.averageRating}
              </div>
              <div className="text-sm text-[#5e5e5e]">Average Rating</div>
            </div>
          </div>
          <div className="mt-4 bg-[#f8f9fa] rounded-[12px] p-4 text-center">
            <p className="text-[#5e5e5e] text-sm">
              Member since {cookData.statistics.joinDate}
            </p>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-[#abe57d] to-[#00955d] text-white py-4 rounded-[16px] font-semibold text-base"
          >
            Save Changes
          </button>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
