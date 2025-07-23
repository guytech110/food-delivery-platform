import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMenu } from "../contexts/MenuContext";
import { MenuItem } from "../contexts/MenuContext";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../hooks/use-toast";
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

const dietaryOptions = [
  { label: "Vegetarian", icon: "🌱" },
  { label: "Vegan", icon: "❤️" },
  { label: "Gluten-free", icon: "🌾" },
  { label: "Halal", icon: "🍽️" },
  { label: "Allergy friendly", icon: "⚡" },
];

const topCategories = [
  "Breakfast and Brunch",
  "Coffee and Tea",
  "Chinese",
  "Indian",
  "Latest Deals",
];

const recentSearches = ["Cafe", "Irish"];

const Search: React.FC = () => {
  const navigate = useNavigate();
  const { menuItems, subscribeToAllMenus } = useMenu();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [dietary, setDietary] = useState<{ [key: string]: boolean }>({});
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Subscribe to menu items
  useEffect(() => {
    const unsubscribe = subscribeToAllMenus();
    return () => unsubscribe();
  }, [subscribeToAllMenus]);

  // Group menu items by cook
  const cooks: Cook[] = useMemo(() => {
    const cookMap = new Map<string, Cook>();
    
    menuItems.forEach(item => {
      if (!cookMap.has(item.cookId)) {
        cookMap.set(item.cookId, {
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
      cookMap.get(item.cookId)!.menuItems.push(item);
    });
    
    return Array.from(cookMap.values());
  }, [menuItems]);

  // Filter cooks based on search query
  const filteredCooks = useMemo(() => {
    if (!search.trim()) return [];
    
    const searchLower = search.toLowerCase();
    
    const filtered = cooks.filter((cook: Cook) => {
      // Search in cook name
      const nameMatch = cook.name.toLowerCase().includes(searchLower);
      
      // Search in cuisine type
      const cuisineMatch = cook.cuisine?.toLowerCase().includes(searchLower);
      
      // Search in all menu items (name, description, category)
      const menuItemMatch = cook.menuItems.some(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
      );
      
      // If any match is found, include this cook
      return nameMatch || cuisineMatch || menuItemMatch;
    });
    
    return filtered;
  }, [cooks, search]);

  const handleToggle = (label: string) => {
    setDietary((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    // Add to search history
    if (searchTerm.trim() && !searchHistory.includes(searchTerm.trim())) {
      setSearchHistory(prev => [searchTerm.trim(), ...prev.slice(0, 4)]);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    // Add item to cart
    addToCart(item, item.cookId, item.cookName || 'Unknown Cook', 1);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 pt-6 pb-4 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-2 hover:bg-gray-100"
          aria-label="Back"
        >
          <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="flex-1 flex items-center bg-gray-50 rounded-full px-3 py-2">
          <svg width="20" height="20" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="7"/><path d="M16 16l-3.5-3.5"/></svg>
          <input
            className="bg-transparent flex-1 px-2 py-1 outline-none text-base"
            placeholder="Search for food, restaurants, or categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="ml-2 rounded-full p-2 hover:bg-gray-100">
          <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="10"/><path d="M11 7v4l2 2"/></svg>
        </button>
      </div>

      {/* Search Results */}
      {search.trim() && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-4">
            <div className="text-sm text-gray-600 mb-3">
              {filteredCooks.length > 0 
                ? `${filteredCooks.length} cook${filteredCooks.length === 1 ? '' : 's'} found`
                : 'No results found'
              }
            </div>
            
            {filteredCooks.length > 0 && (
              <div className="space-y-4">
                {filteredCooks.map((cook) => (
                  <CookCard key={cook.id} cook={cook} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Default Search UI (when no search query) */}
      {!search.trim() && (
        <div className="flex-1 overflow-y-auto">
          {/* Recent searches */}
          <div className="px-6 pt-6">
            <div className="text-xs text-gray-400 mb-2">Recent searches</div>
            <div className="space-y-1 mb-6">
              {searchHistory.length > 0 ? (
                searchHistory.map((item) => (
                  <div 
                    key={item} 
                    onClick={() => handleSearch(item)}
                    className="flex items-center gap-2 text-gray-800 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <svg width="16" height="16" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="7"/></svg>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))
              ) : (
                recentSearches.map((item) => (
                  <div 
                    key={item} 
                    onClick={() => handleSearch(item)}
                    className="flex items-center gap-2 text-gray-800 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <svg width="16" height="16" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="7"/></svg>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))
              )}
            </div>

            {/* Dietary preferences */}
            <div className="mb-6">
              <div className="text-xs text-gray-400 mb-2">Dietary preferences</div>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleToggle(option.label)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      dietary[option.label]
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Top categories */}
            <div className="mb-6">
              <div className="text-xs text-gray-400 mb-2">Top categories</div>
              <div className="space-y-1">
                {topCategories.map((category) => (
                  <div 
                    key={category} 
                    onClick={() => handleSearch(category)}
                    className="flex items-center gap-2 text-gray-800 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <svg width="16" height="16" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="7"/></svg>
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
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

export default Search; 