import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import Map from '@/components/Map';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, MessageCircle, Clock, MapPin, Truck, CheckCircle, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

const DeliveryTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrderById, updateOrderStatus } = useOrders();
  const { user } = useAuth();
  const { toast } = useToast();

  const [order, setOrder] = useState<any>(null);
  const [cookLocation, setCookLocation] = useState<Location | null>(null);
  const [customerLocation, setCustomerLocation] = useState<Location | null>(null);
  const [eta, setEta] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDelivering, setIsDelivering] = useState(false);

  // Load order data
  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) return;
      
      try {
        const orderData = await getOrderById(orderId);
        if (orderData) {
          setOrder(orderData);
          setIsDelivering(['ready', 'out_for_delivery'].includes(orderData.status));
          
          // Mock customer location (in real app, this would come from customer's GPS)
          const mockCustomerLocation = {
            lat: 37.7749 + (Math.random() - 0.5) * 0.01,
            lng: -122.4194 + (Math.random() - 0.5) * 0.01
          };
          setCustomerLocation(mockCustomerLocation);
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

  // Get cook's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCookLocation(location);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Watch cook location for live updates
  useEffect(() => {
    if (navigator.geolocation && isDelivering) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCookLocation(location);
        },
        (error) => {
          console.error('Error watching location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isDelivering]);

  // Calculate ETA when locations are available
  useEffect(() => {
    if (cookLocation && customerLocation) {
      // Simple ETA calculation (in real app, use Google Directions API)
      const distance = Math.sqrt(
        Math.pow(cookLocation.lat - customerLocation.lat, 2) + 
        Math.pow(cookLocation.lng - customerLocation.lng, 2)
      ) * 111000; // Rough conversion to meters
      
      const estimatedMinutes = Math.max(5, Math.round(distance / 1000 * 2)); // 2 min per km, minimum 5 min
      setEta(`${estimatedMinutes} min`);
    }
  }, [cookLocation, customerLocation]);

  const handleStartDelivery = async () => {
    try {
      await updateOrderStatus(orderId!, 'out_for_delivery');
      setIsDelivering(true);
      toast({
        title: "Delivery Started",
        description: "You're now on your way to deliver the order",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start delivery",
        variant: "destructive"
      });
    }
  };

  const handleCompleteDelivery = async () => {
    try {
      await updateOrderStatus(orderId!, 'delivered');
      toast({
        title: "Delivery Complete",
        description: "Order has been delivered successfully",
      });
      navigate('/orders');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete delivery",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading delivery details...</p>
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

  const route = cookLocation && customerLocation ? {
    origin: cookLocation,
    destination: customerLocation
  } : undefined;

  const markers = [
    ...(cookLocation ? [{
      position: cookLocation,
      title: 'Your Location',
      icon: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
          <circle cx="12" cy="12" r="3" fill="white"/>
        </svg>
      `),
      isLive: isDelivering
    }] : []),
    ...(customerLocation ? [{
      position: customerLocation,
      title: 'Customer Location',
      icon: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#FF6B35"/>
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
          <h1 className="text-lg font-semibold">Delivery Tracking</h1>
          <div className="w-9"></div>
        </div>
      </div>

      {/* Order Info */}
      <div className="p-4">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order #{order.id.slice(-6)}</span>
              <Badge className={`${
                order.status === 'ready' ? 'bg-green-100 text-green-800' :
                order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status === 'ready' ? 'Ready for Delivery' :
                 order.status === 'out_for_delivery' ? 'Out for Delivery' :
                 order.status}
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
              {eta && isDelivering && (
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">
                    ETA to customer: {eta}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Delivery Route</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Map
              markers={markers}
              route={route}
              showETA={isDelivering}
              height="300px"
              onLocationUpdate={(location) => {
                setCookLocation(location);
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

        {/* Action Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {order.status === 'ready' && (
                <Button
                  onClick={handleStartDelivery}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Start Delivery
                </Button>
              )}
              
              {order.status === 'out_for_delivery' && (
                <Button
                  onClick={handleCompleteDelivery}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Delivery
                </Button>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    // In real app, this would open navigation
                    toast({
                      title: "Navigation",
                      description: "Opening navigation app...",
                    });
                  }}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    // In real app, this would open chat
                    toast({
                      title: "Message Customer",
                      description: "Opening chat...",
                    });
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryTracking; 