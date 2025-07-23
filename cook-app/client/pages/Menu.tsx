import BottomNavigation from "../components/BottomNavigation";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMenu } from "@/contexts/MenuContext";
import { useAuth } from "@/contexts/AuthContext";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const { cookMenuItems, subscribeToCookMenu, isLoading } = useMenu();
  const { cook, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (cook) {
      const unsubscribe = subscribeToCookMenu(cook.id);
      return () => {
        unsubscribe();
      };
    }
  }, [cook, subscribeToCookMenu]);

  return (
    <div className="min-h-screen bg-white font-urbanist pb-[85px]">
      {/* Header */}
      <div className="w-full h-[170px] bg-gradient-to-b from-[rgba(80,186,108,0.50)] to-[rgba(80,186,108,0.00)] relative">
        <div className="absolute left-5 top-[60px]">
          <h1 className="text-2xl font-semibold text-[#191919]">Your Menu</h1>
          <p className="text-[#5e5e5e] text-base mt-1">
            Manage your delicious menu items
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 pt-[40px] pb-8">
        {/* Add New Item Button */}
        <button
          onClick={() => navigate("/new-item")}
          className="w-full bg-gradient-to-r from-[#abe57d] to-[#00955d] rounded-[16px] p-6 text-left mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white text-lg font-semibold mb-1">
                Add New Menu Item
              </h3>
              <p className="text-white/90 text-sm">
                Create a new delicious item for your menu
              </p>
            </div>
            <div className="text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4.5V19.5M19.5 12H4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </button>

        {/* Menu Categories */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#191919] mb-4">
            Categories
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#f8f9fa] rounded-[16px] p-4 text-center">
              <div className="text-2xl mb-2">🍔</div>
              <div className="text-sm font-medium text-[#191919]">
                Main Course
              </div>
              <div className="text-xs text-[#5e5e5e]">0 items</div>
            </div>
            <div className="bg-[#f8f9fa] rounded-[16px] p-4 text-center">
              <div className="text-2xl mb-2">🍰</div>
              <div className="text-sm font-medium text-[#191919]">Desserts</div>
              <div className="text-xs text-[#5e5e5e]">0 items</div>
            </div>
            <div className="bg-[#f8f9fa] rounded-[16px] p-4 text-center">
              <div className="text-2xl mb-2">🥤</div>
              <div className="text-sm font-medium text-[#191919]">
                Beverages
              </div>
              <div className="text-xs text-[#5e5e5e]">0 items</div>
            </div>
            <div className="bg-[#f8f9fa] rounded-[16px] p-4 text-center">
              <div className="text-2xl mb-2">🥗</div>
              <div className="text-sm font-medium text-[#191919]">Salads</div>
              <div className="text-xs text-[#5e5e5e]">0 items</div>
            </div>
          </div>
        </div>

        {/* All Menu Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#191919]">
              All Menu Items
            </h2>
            <button
              onClick={() => navigate("/new-item")}
              className="text-[#00955d] text-sm font-medium"
            >
              + Add Item
            </button>
          </div>
          {isLoading ? (
            <div className="bg-[#f8f9fa] rounded-[16px] p-6 text-center">
              <div className="text-[#5e5e5e] mb-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00955d] mx-auto"></div>
              </div>
              <p className="text-[#5e5e5e] text-sm">Loading menu items...</p>
            </div>
          ) : cookMenuItems.length === 0 ? (
            <div className="bg-[#f8f9fa] rounded-[16px] p-6 text-center">
              <div className="text-[#5e5e5e] mb-2">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto"
                >
                  <path
                    d="M3 12H21M3 6H21M3 18H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-[#191919] font-medium mb-2">
                No menu items yet
              </h3>
              <p className="text-[#5e5e5e] text-sm mb-4">
                Create your first delicious menu item to start taking orders
              </p>
              <button
                onClick={() => navigate("/new-item")}
                className="bg-[#00955d] text-white px-6 py-2 rounded-[12px] text-sm font-medium"
              >
                Add Your First Item
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cookMenuItems.map((item) => (
                <div key={item.id} className="bg-white border border-[#e6e6e6] rounded-[16px] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[#191919] font-semibold text-lg">
                          {item.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <p className="text-[#5e5e5e] text-sm mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#00955d] font-semibold text-lg">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-[#5e5e5e] text-sm">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end gap-2">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                      <button
                        onClick={() => navigate(`/edit-item/${item.id}`)}
                        className="bg-[#00955d] text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-[#007a4d] transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Menu;
