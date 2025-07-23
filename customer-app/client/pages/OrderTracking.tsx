import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import Map from '@/components/Map';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, MessageCircle, Clock, MapPin, Truck, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrderById } = useOrders();
  const { user } = useAuth();
  const { toast } = useToast();

  const [order, setOrder] = useState<any>(null);
  const [cookLocation, setCookLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [eta, setEta] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Load order data
  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) return;
      
      try {
        const orderData = await getOrderById(orderId);
        if (orderData) {
          setOrder(orderData);
          
          // Mock cook location (in real app, this would come from cook's GPS)
          // For demo, we'll use a location near the delivery address
          const mockCookLocation = {
            lat: 37.7749 + (Math.random() - 0.5) * 0.01,
            lng: -122.4194 + (Math.random() - 0.5) * 0.01
          };
          setCookLocation(mockCookLocation);
        }
      } catch (error) {
        console.error('Error loading order:', error);
        toast({
          title: "Error",
          description: "Failed to load order details",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [orderId, getOrderById, toast]);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Calculate ETA when locations are available
  useEffect(() => {
    if (cookLocation && userLocation) {
      // Simple ETA calculation (in real app, use Google Directions API)
      const distance = Math.sqrt(
        Math.pow(cookLocation.lat - userLocation.lat, 2) + 
        Math.pow(cookLocation.lng - userLocation.lng, 2)
      ) * 111000; // Rough conversion to meters
      
      const estimatedMinutes = Math.max(15, Math.round(distance / 1000 * 2)); // 2 min per km, minimum 15 min
      setEta(`${estimatedMinutes} min`);
    }
  }, [cookLocation, userLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">The order you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/orders')}>Back to Orders</Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'cooking': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'cooking': return <Truck className="w-4 h-4" />;
      case 'ready': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const route = cookLocation && userLocation ? {
    origin: cookLocation,
    destination: userLocation
  } : undefined;

  const markers = [
    ...(cookLocation ? [{
      position: cookLocation,
      title: `${order.cookName}'s Location`,
      icon: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FF6B35"/>
        </svg>
      `),
      isLive: true
    }] : []),
    ...(userLocation ? [{
      position: userLocation,
      title: 'Your Location',
      icon: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4"/>
          <circle cx="12" cy="9" r="2.5" fill="white"/>
        </svg>
      `)
    }] : [])
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Order Tracking</h1>
          <div className="w-9"></div>
        </div>
      </div>

      {/* Order Info */}
      <div className="p-4">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order #{order.id.slice(-6)}</span>
              <Badge className={getStatusColor(order.status)}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(order.status)}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{order.deliveryAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Ordered at {order.createdAt.toDate().toLocaleTimeString()}
                </span>
              </div>
              {eta && (
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">
                    Estimated arrival: {eta}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Live Tracking</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Map
              markers={markers}
              route={route}
              showETA={true}
              height="300px"
              onLocationUpdate={(location) => {
                if (location.lat === userLocation?.lat && location.lng === userLocation?.lng) {
                  setUserLocation(location);
                }
              }}
              onRouteCalculated={(routeData) => {
                if (routeData.routes[0]?.legs[0]?.duration) {
                  const minutes = Math.round(routeData.routes[0].legs[0].duration.value / 60);
                  setEta(`${minutes} min`);
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-3">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Communication */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Cook</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  // In real app, this would open phone dialer
                  toast({
                    title: "Call Cook",
                    description: `Calling ${order.cookName}...`,
                  });
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  // In real app, this would open chat
                  toast({
                    title: "Message Cook",
                    description: "Opening chat...",
                  });
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderTracking; 