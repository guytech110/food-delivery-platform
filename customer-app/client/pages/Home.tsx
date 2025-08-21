import React, { useState, useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";
import { restaurants, categories } from "../data/restaurants";
import FoodItem from "../components/FoodItem";
import CartIcon from "../components/CartIcon";
import NotificationBell from "../components/NotificationBell";
import MapComponent from "../components/Map";
import { useNavigate } from "react-router-dom";
import { useMenu } from "@/contexts/MenuContext";
import { MenuItem } from "@/contexts/MenuContext";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Star, Clock, MapPin } from "lucide-react";

interface Cook {
  id: string;
  name: string;
  rating?: number;
  reviewCount?: number;
  cuisine?: string;
  address?: string;
  deliveryTime?: string;
  deliveryFee?: number;
  image?: string;
  menuItems: MenuItem[];
}

const Home = () => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [nearMe, setNearMe] = useState(false);
  const navigate = useNavigate();
  const { menuItems, subscribeToAllMenus, isLoading } = useMenu();

  useEffect(() => {
    const unsubscribe = subscribeToAllMenus();
    return () => {
      unsubscribe();
    };
  }, []); // Removed subscribeToAllMenus from dependencies

  const handleMapClick = () => {
    setIsMapExpanded(!isMapExpanded);
  };

  // Get recommended items from live menu data (sorted by rating)
  const recommendedItems = React.useMemo(() => {
    return menuItems
      .slice()
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 8);
  }, [menuItems]);

  // Group menu items by cook
  const cooks: Cook[] = React.useMemo(() => {
    const cookMapData = new Map<string, Cook>();
    
    menuItems.forEach(item => {
      if (!cookMapData.has(item.cookId)) {
        cookMapData.set(item.cookId, {
          id: item.cookId,
          name: item.cookName || "Local Cook",
          rating: 4.5,
          reviewCount: Math.floor(Math.random() * 200) + 50,
          cuisine: "American, Italian",
          address: "123 Main St, Downtown",
          deliveryTime: "25-35 min",
          deliveryFee: 2.99,
          image: item.image || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
          menuItems: []
        });
      }
      cookMapData.get(item.cookId)!.menuItems.push(item);
    });
    
    return Array.from(cookMapData.values());
  }, [menuItems]);

  // Filter cooks based on search, category, and nearMe toggle
  const filteredCooks = cooks.filter(cook => {
    const matchesSearch = searchQuery === "" || 
      cook.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cook.cuisine?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || 
      cook.menuItems.some(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="px-5 py-4">
          {/* Header with Cart and Near Me Toggle */}
          <div className="flex justify-between items-center mb-4">
            {/* Notification Bell */}
            <NotificationBell />
            <div></div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-3">
            <div
              className="flex-1 bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/search")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                  stroke="#666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Search cuisine or restaurant"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm font-urbanist text-black placeholder-gray-500 outline-none flex-1"
                readOnly
              />
            </div>
            {/* CartIcon is now the only icon on the right */}
            <CartIcon />
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div
        className={`relative bg-gray-300 overflow-hidden cursor-pointer transition-all duration-300 ${
          isMapExpanded ? "h-screen" : "h-80"
        }`}
        style={{ marginTop: "120px" }}
        onClick={handleMapClick}
      >
        <MapComponent
          height={isMapExpanded ? "100vh" : "320px"}
          markers={nearMe ? cooks.map(cook => ({
            position: {
              lat: 37.7749 + (Math.random() - 0.5) * 0.01, // Mock cook locations
              lng: -122.4194 + (Math.random() - 0.5) * 0.01
            },
            title: cook.name,
            icon: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FF6B35"/>
              </svg>
            `)
          })) : []}
          onLocationUpdate={(location) => {
            // Location update handled silently
          }}
        />

        {/* Map Controls - Show when expanded */}
        {isMapExpanded && (
          <div className="absolute top-0 left-0 right-0 p-5 z-20 flex flex-col items-start gap-4">
            {/* Near Me Toggle inside the map when expanded, now on the left */}
            <div 
              className="flex items-center gap-2 bg-green-100 rounded-xl px-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm font-medium text-green-800 font-urbanist">
                Near me
              </span>
              <label className="relative inline-flex items-center cursor-pointer ml-2">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={nearMe}
                  onChange={(e) => {
                    e.stopPropagation();
                    setNearMe(v => !v);
                  }}
                />
                <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full shadow transform transition-transform duration-200 peer-checked:translate-x-4"></div>
              </label>
            </div>
            <div className="flex justify-end w-full">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMapExpanded(false);
                }}
                className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Tap to expand indicator - Show when not expanded */}
        {!isMapExpanded && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
              <span className="text-xs font-medium text-black font-urbanist">
                Tap to explore
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="animate-pulse"
              >
                <path
                  d="M8 12L12 8L16 12"
                  stroke="#00955D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      {!isMapExpanded && (
        <div className="bg-white rounded-t-3xl -mt-6 relative z-10 pb-24">
          <div className="px-5 pt-8">
            {/* Categories Section */}
            <section className="mb-8">
              <h2 className="text-xl font-medium text-gray-800 mb-4 capitalize font-urbanist">
                Categories
              </h2>
              <div className="grid grid-cols-5 gap-2">
                {categories.slice(0, 5).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                    className={`rounded-3xl p-3 flex flex-col items-center transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-green-100 border-2 border-green-300'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-2xl mb-1">{category.icon}</span>
                    <span className={`text-sm font-medium font-urbanist ${
                      selectedCategory === category.name
                        ? 'text-green-700'
                        : 'text-gray-700 opacity-70'
                    }`}>
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Near Me Filter Indicator */}
            {nearMe && (
              <section className="mb-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                          fill="#059669"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-green-800 font-urbanist">
                        Near Me Filter Active
                      </h3>
                      <p className="text-sm text-green-600 font-urbanist">
                        Showing {filteredCooks.length} cooks within 1km
                      </p>
                    </div>
                    <button
                      onClick={() => setNearMe(false)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Search Results Section */}
            {(searchQuery || selectedCategory) && filteredCooks.length > 0 && (
              <section className="mb-8">
                <div className="mb-4">
                  <h2 className="text-xl font-medium text-gray-800 font-urbanist">
                    {searchQuery ? `Search Results for "${searchQuery}"` : `Category: ${selectedCategory}`}
                  </h2>
                  <p className="text-sm text-black/50 font-readex-pro font-light">
                    {filteredCooks.length} cooks found
                  </p>
                </div>

                <div className="space-y-4">
                  {filteredCooks.map((cook) => (
                    <CookCard key={cook.id} cook={cook} />
                  ))}
                </div>
              </section>
            )}

            {/* No Results Message */}
            {(searchQuery || selectedCategory) && filteredCooks.length === 0 && (
              <section className="mb-8">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                        stroke="#666"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-black mb-2 font-urbanist">
                    No cooks found
                  </h3>
                  <p className="text-sm text-gray-600 font-urbanist">
                    Try adjusting your search or category filter
                  </p>
                </div>
              </section>
            )}

            {/* Available Cooks Section */}
            <section className="mb-8">
              <div className="mb-4">
                <h2 className="text-xl font-medium text-gray-800 font-urbanist">
                  Available Cooks
                </h2>
                <p className="text-sm text-black/50 font-readex-pro font-light">
                  Fresh food from local cooks
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
              ) : cooks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                        stroke="#666"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                              />
                            </svg>
                  </div>
                  <h3 className="font-semibold text-black mb-2 font-urbanist">
                    No cooks available
                  </h3>
                  <p className="text-sm text-gray-600 font-urbanist">
                    Check back later for fresh food from local cooks
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cooks.slice(0, 10).map((cook) => (
                    <CookCard key={cook.id} cook={cook} />
                  ))}
                </div>
              )}
            </section>

            {/* Recommended Items Section */}
            <section className="mb-8">
              <div className="mb-4">
                <h2 className="text-xl font-medium text-gray-800 font-urbanist">
                  Recommended Items
                </h2>
                <p className="text-sm text-black/50 font-readex-pro font-light">
                  Popular dishes you might like
                </p>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {recommendedItems.slice(0, 5).map((item) => (
                  <FoodItem
                    key={item.id}
                    item={item}
                    restaurantId={item.cookId}
                    restaurantName={item.cookName}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

// Cook Card Component
const CookCard: React.FC<{ cook: Cook }> = ({ cook }) => {
  const navigate = useNavigate();
  
  const handleCookClick = () => {
    navigate(`/cook/${cook.id}`);
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCookClick}
    >
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src={cook.image}
              alt={cook.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{cook.name}</h3>
              {cook.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{cook.rating}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600">{cook.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600">{cook.address}</span>
              </div>
            </div>

            {cook.cuisine && (
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {cook.cuisine}
                </Badge>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">
                {cook.menuItems.length} items • ${cook.deliveryFee} delivery
              </span>
              <span className="text-xs text-green-600 font-medium">
                View Menu
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Home;
