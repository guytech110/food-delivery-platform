import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMenu } from '../contexts/MenuContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { MenuItem } from '../contexts/MenuContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Star, Clock, MapPin, ArrowLeft } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

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
}

const CookProfile: React.FC = () => {
  const { cookId } = useParams<{ cookId: string }>();
  const navigate = useNavigate();
  const { getMenuItemsByCook } = useMenu();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [cook, setCook] = useState<Cook | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookId) {
      loadCookProfile();
      loadCookMenu();
    }
  }, [cookId]);

  const loadCookProfile = async () => {
    try {
      // For now, we'll create a mock cook profile
      // In the future, this would come from a cooks collection
      setCook({
        id: cookId!,
        name: "Chef John's Kitchen",
        rating: 4.5,
        reviewCount: 128,
        cuisine: "American, Italian",
        address: "123 Main St, Downtown",
        deliveryTime: "25-35 min",
        deliveryFee: 2.99,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop"
      });
    } catch (error) {
      console.error('Error loading cook profile:', error);
    }
  };

  const loadCookMenu = async () => {
    try {
      setLoading(true);
      const items = await getMenuItemsByCook(cookId!);
      setMenuItems(items);
    } catch (error) {
      console.error('Error loading cook menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(item, cook.id, cook.name, 1);
  };

  if (!cook) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cook profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-urbanist pb-[85px]">
      {/* Header Image */}
      <div className="relative h-48 bg-gradient-to-b from-gray-900 to-gray-700">
        <img 
          src={cook.image} 
          alt={cook.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Cook Info */}
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{cook.name}</h1>
          
          <div className="flex items-center gap-4 mb-3">
            {cook.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{cook.rating}</span>
                <span className="text-sm text-gray-500">({cook.reviewCount} reviews)</span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{cook.deliveryTime}</span>
            </div>
          </div>

          {cook.cuisine && (
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                {cook.cuisine}
              </Badge>
            </div>
          )}

          {cook.address && (
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4" />
              <span>{cook.address}</span>
            </div>
          )}

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Delivery fee</p>
              <p className="font-medium">${cook.deliveryFee}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivery time</p>
              <p className="font-medium">{cook.deliveryTime}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <section className="mb-8">
          <h2 className="text-xl font-medium text-gray-800 mb-4">Menu</h2>
          
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-lg mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : menuItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No menu items available</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-32">
                      <img
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</h3>
                        <span className="font-semibold text-green-600 text-sm ml-2">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <Button
                        onClick={() => handleAddToCart(item)}
                        size="sm"
                        className="w-full text-xs"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CookProfile; 