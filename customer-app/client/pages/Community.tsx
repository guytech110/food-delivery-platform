import React, { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";

const mockPosts = [
  {
    id: 1,
    user: {
      name: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    time: "2h ago",
    text: "Just tried the new vegan burger from Mama's Kitchen. Absolutely delicious! 🍔🌱",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    user: {
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    time: "5h ago",
    text: "Anyone have recommendations for gluten-free desserts in the area?",
    image: null,
    likes: 5,
    comments: 2,
  },
  {
    id: 3,
    user: {
      name: "Aisha Ali",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    time: "1d ago",
    text: "Loved the community event yesterday! Met so many fellow foodies. 🍲🤝",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    likes: 18,
    comments: 6,
  },
];

const tabs = ["Feed", "Questions", "Events"];

const Community = () => {
  const [activeTab, setActiveTab] = useState("Feed");
  const [postText, setPostText] = useState("");

  return (
    <div className="min-h-screen bg-white w-full max-w-sm mx-auto relative flex flex-col">
      {/* Header */}
      <div className="p-5 pt-12 pb-2">
        <h1 className="text-2xl font-bold text-black font-urbanist">Community</h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-between px-5 border-b border-gray-100 mb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 flex-1 text-center font-medium font-urbanist text-sm transition-colors ${
              activeTab === tab ? "border-b-2 border-green-500 text-green-700" : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Post Input */}
      {activeTab === "Feed" && (
        <div className="px-5 py-3 border-b border-gray-100 flex items-start gap-3 bg-gray-50">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              className="w-full bg-white rounded-xl border border-gray-200 px-3 py-2 text-sm font-urbanist resize-none focus:outline-none focus:ring-2 focus:ring-green-200"
              rows={2}
              placeholder="Share something with the community..."
              value={postText}
              onChange={e => setPostText(e.target.value)}
            />
            <div className="flex justify-between items-center mt-2">
              <button className="text-green-600 font-semibold text-sm px-3 py-1 rounded hover:bg-green-100 transition-colors">
                Add Photo
              </button>
              <button
                className="bg-green-600 text-white px-4 py-1 rounded-full font-semibold text-sm shadow hover:bg-green-700 transition-colors"
                disabled={!postText.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feed */}
      <div className="flex-1 overflow-y-auto pb-28">
        {activeTab === "Feed" && (
          <div className="px-5 pt-4 space-y-6">
            {mockPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm p-4">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm text-gray-900 font-urbanist">
                      {post.user.name}
                    </div>
                    <div className="text-xs text-gray-400 font-urbanist">{post.time}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-800 font-urbanist mb-2 whitespace-pre-line">
                  {post.text}
                </div>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post visual"
                    className="w-full h-40 object-cover rounded-xl mb-2"
                  />
                )}
                <div className="flex gap-6 text-gray-500 text-xs font-medium mt-2">
                  <span>👍 {post.likes} Likes</span>
                  <span>💬 {post.comments} Comments</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "Questions" && (
          <div className="px-5 pt-8 text-center text-gray-400 font-urbanist">
            <p>No questions yet. Be the first to ask!</p>
          </div>
        )}
        {activeTab === "Events" && (
          <div className="px-5 pt-8 text-center text-gray-400 font-urbanist">
            <p>No events yet. Stay tuned!</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Community;
