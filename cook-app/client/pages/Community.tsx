import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Community: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"feed" | "cooks" | "challenges">(
    "feed",
  );

  // Mock data for community content
  const feedPosts = [
    {
      id: 1,
      author: "Maria Rodriguez",
      authorImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b412?w=50&h=50&fit=crop&crop=face",
      time: "2 hours ago",
      content:
        "Just launched my new Italian pasta special! The secret is in the homemade sauce 🍝",
      image:
        "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      author: "Chef David Kim",
      authorImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      time: "4 hours ago",
      content:
        "Pro tip: Always let your meat rest for 5 minutes after cooking for maximum flavor! 🥩",
      likes: 42,
      comments: 15,
    },
    {
      id: 3,
      author: "Sarah Johnson",
      authorImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      time: "6 hours ago",
      content:
        "Excited to share my Mediterranean bowl recipe with the community! Fresh ingredients make all the difference 🥗",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      likes: 38,
      comments: 12,
    },
  ];

  const topCooks = [
    {
      id: 1,
      name: "Chef Maria Rodriguez",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b412?w=60&h=60&fit=crop&crop=face",
      cuisine: "Italian",
      rating: 4.9,
      orders: 156,
    },
    {
      id: 2,
      name: "Chef David Kim",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      cuisine: "Korean BBQ",
      rating: 4.8,
      orders: 142,
    },
    {
      id: 3,
      name: "Chef Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      cuisine: "Mediterranean",
      rating: 4.7,
      orders: 128,
    },
    {
      id: 4,
      name: "Chef Alex Thompson",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      cuisine: "American",
      rating: 4.6,
      orders: 98,
    },
  ];

  const challenges = [
    {
      id: 1,
      title: "Weekend Special Challenge",
      description:
        "Create a unique weekend dish that represents your cuisine style",
      participants: 23,
      timeLeft: "2 days left",
      prize: "$500",
      status: "active",
    },
    {
      id: 2,
      title: "Healthy Meal Challenge",
      description: "Design a nutritious meal under 500 calories",
      participants: 45,
      timeLeft: "5 days left",
      prize: "$300",
      status: "active",
    },
    {
      id: 3,
      title: "Fusion Food Challenge",
      description: "Combine two different cuisines in one amazing dish",
      participants: 67,
      timeLeft: "Completed",
      prize: "$750",
      status: "completed",
    },
  ];

  const renderFeedTab = () => (
    <div className="space-y-4">
      {feedPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white border border-[#e6e6e6] rounded-[16px] p-4"
        >
          {/* Post Header */}
          <div className="flex items-center gap-3 mb-3">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="text-[#191919] font-semibold text-sm">
                {post.author}
              </h4>
              <p className="text-[#5e5e5e] text-xs">{post.time}</p>
            </div>
          </div>

          {/* Post Content */}
          <p className="text-[#191919] text-sm mb-3">{post.content}</p>

          {/* Post Image */}
          {post.image && (
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-48 object-cover rounded-[12px] mb-3"
            />
          )}

          {/* Post Actions */}
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-[#5e5e5e]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-[#5e5e5e]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm">{post.comments}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCooksTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#191919]">Top Rated Cooks</h3>
      {topCooks.map((cook, index) => (
        <div
          key={cook.id}
          className="flex items-center gap-4 p-4 bg-white border border-[#e6e6e6] rounded-[16px]"
        >
          <div className="relative">
            <img
              src={cook.image}
              alt={cook.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="absolute -top-1 -left-1 w-6 h-6 bg-[#00955d] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">#{index + 1}</span>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-[#191919] font-semibold">{cook.name}</h4>
            <p className="text-[#5e5e5e] text-sm">{cook.cuisine}</p>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="#00955d"
                  />
                </svg>
                <span className="text-[#00955d] text-xs font-medium">
                  {cook.rating}
                </span>
              </div>
              <span className="text-[#5e5e5e] text-xs">•</span>
              <span className="text-[#5e5e5e] text-xs">
                {cook.orders} orders
              </span>
            </div>
          </div>
          <button className="bg-[#00955d] text-white px-4 py-2 rounded-[8px] text-sm font-medium">
            Follow
          </button>
        </div>
      ))}
    </div>
  );

  const renderChallengesTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#191919]">
        Cooking Challenges
      </h3>
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="p-4 bg-white border border-[#e6e6e6] rounded-[16px]"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="text-[#191919] font-semibold mb-1">
                {challenge.title}
              </h4>
              <p className="text-[#5e5e5e] text-sm mb-2">
                {challenge.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#5e5e5e]">
                <span>{challenge.participants} participants</span>
                <span>•</span>
                <span>{challenge.timeLeft}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#00955d] font-bold text-lg">
                {challenge.prize}
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  challenge.status === "active"
                    ? "bg-[#00955d]/10 text-[#00955d]"
                    : "bg-[#5e5e5e]/10 text-[#5e5e5e]"
                }`}
              >
                {challenge.status === "active" ? "Active" : "Completed"}
              </div>
            </div>
          </div>

          {challenge.status === "active" && (
            <button className="w-full bg-gradient-to-r from-[#abe57d] to-[#00955d] text-white py-3 rounded-[12px] font-semibold text-sm">
              Join Challenge
            </button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-urbanist pb-[85px]">
      {/* Header */}
      <div className="w-full h-[170px] bg-gradient-to-b from-[rgba(80,186,108,0.50)] to-[rgba(80,186,108,0.00)] relative">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 top-[60px] text-black text-2xl font-semibold">
          Community
        </h1>
      </div>

      {/* Tab Navigation */}
      <div className="px-5 pt-[20px]">
        <div className="flex bg-white rounded-[16px] p-1 mb-6">
          <button
            onClick={() => setActiveTab("feed")}
            className={`flex-1 py-3 px-4 rounded-[12px] text-sm font-medium transition-colors ${
              activeTab === "feed"
                ? "bg-[#00955d] text-white"
                : "text-[#5e5e5e]"
            }`}
          >
            Feed
          </button>
          <button
            onClick={() => setActiveTab("cooks")}
            className={`flex-1 py-3 px-4 rounded-[12px] text-sm font-medium transition-colors ${
              activeTab === "cooks"
                ? "bg-[#00955d] text-white"
                : "text-[#5e5e5e]"
            }`}
          >
            Top Cooks
          </button>
          <button
            onClick={() => setActiveTab("challenges")}
            className={`flex-1 py-3 px-4 rounded-[12px] text-sm font-medium transition-colors ${
              activeTab === "challenges"
                ? "bg-[#00955d] text-white"
                : "text-[#5e5e5e]"
            }`}
          >
            Challenges
          </button>
        </div>

        {/* Tab Content */}
        <div className="pb-8">
          {activeTab === "feed" && renderFeedTab()}
          {activeTab === "cooks" && renderCooksTab()}
          {activeTab === "challenges" && renderChallengesTab()}
        </div>
      </div>

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

          {/* Earnings */}
          <button
            onClick={() => navigate("/earnings")}
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
                d="M9.40997 3.77208C8.96039 3.84333 8.65039 4.23583 8.65039 4.69167C8.65037 5.27729 8.82312 5.84991 9.14701 6.33782C9.4709 6.82572 9.93153 7.20724 10.4712 7.43458C7.22581 8.8675 4.90039 12.5987 4.90039 15.6875C4.90039 19.5996 8.63122 21 13.2337 21C17.8362 21 21.5671 19.5996 21.5671 15.6875C21.5671 12.5987 19.2408 8.8675 15.9962 7.43417C16.5359 7.20682 16.9966 6.82531 17.3204 6.3374C17.6443 5.84949 17.8171 5.27688 17.8171 4.69125C17.8171 4.23583 17.5071 3.84333 17.0575 3.77208C16.2991 3.65167 14.9941 3.5 13.2337 3.5C11.4733 3.5 10.1679 3.65167 9.40997 3.77208Z"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.7334 11.4618C15.7334 11.4618 14.7334 10.7923 13.2334 10.7923C11.9834 10.7923 10.7334 11.4618 10.7334 12.3548C10.7334 14.5868 15.7334 13.2477 15.7334 15.4798C15.7334 16.3727 14.4834 17.0423 13.2334 17.0423C11.7334 17.0423 10.7334 16.3727 10.7334 16.3727"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.2334 10.7917V9.75"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.2334 18.0839V17.0423"
                stroke="#A5A5A5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-[#A5A5A5] text-sm font-medium">Earnings</div>
          </button>

          {/* Community - Active */}
          <div className="flex flex-col items-center justify-center gap-[6px] flex-1 py-[12.5px] px-[8px]">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0998 18.4496L15.5921 14.315H13.3767L11.8998 12.8381L14.8536 8.4073H20.0229M6.73057 4.715L8.29699 6.28141C9.13868 7.12311 9.39778 8.38543 8.9557 9.49063V9.49063C8.50381 10.6204 7.40964 11.3611 6.19289 11.3611H3.03827M21.4998 12.0996C21.4998 17.4015 17.2017 21.6996 11.8998 21.6996C6.59787 21.6996 2.2998 17.4015 2.2998 12.0996C2.2998 6.79768 6.59787 2.49961 11.8998 2.49961C17.2017 2.49961 21.4998 6.79768 21.4998 12.0996Z"
                stroke="#00955D"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#00955D"
              />
            </svg>
            <div className="text-[#00955d] text-sm font-medium">Community</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
