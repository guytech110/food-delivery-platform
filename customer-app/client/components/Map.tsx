import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, Circle } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface MapProps {
  center?: Location;
  markers?: Array<{
    position: Location;
    title?: string;
    icon?: string;
    isLive?: boolean;
  }>;
  route?: {
    origin: Location;
    destination: Location;
    waypoints?: Location[];
  };
  showETA?: boolean;
  onLocationUpdate?: (location: Location) => void;
  onRouteCalculated?: (route: any) => void;
  height?: string;
  zoom?: number;
}

const Map: React.FC<MapProps> = ({
  center = { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
  markers = [],
  route,
  showETA = false,
  onLocationUpdate,
  onRouteCalculated,
  height = "400px",
  zoom = 13
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [eta, setEta] = useState<string>('');
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);

  // Initialize directions service
  useEffect(() => {
    if (window.google && window.google.maps) {
      setDirectionsService(new window.google.maps.DirectionsService());
    }
  }, []);

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
          onLocationUpdate?.(location);
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }, [onLocationUpdate]);

  // Watch user location for live updates
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          onLocationUpdate?.(location);
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
  }, [onLocationUpdate]);

  // Calculate route when route prop changes
  useEffect(() => {
    if (route && directionsService) {
      const request: google.maps.DirectionsRequest = {
        origin: route.origin,
        destination: route.destination,
        waypoints: route.waypoints?.map(wp => ({ location: wp })),
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
          
          // Calculate ETA
          if (result.routes[0]?.legs[0]) {
            const duration = result.routes[0].legs[0].duration;
            if (duration) {
              const minutes = Math.round(duration.value / 60);
              setEta(`${minutes} min`);
            }
          }
          
          onRouteCalculated?.(result);
        }
      });
    }
  }, [route, directionsService, onRouteCalculated]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const mapContainerStyle = {
    width: '100%',
    height: height
  };

  return (
    <div className="relative">
      <LoadScript googleMapsApiKey="AIzaSyAx7l1PEW3C45-D2Gc66N-Ye7O9jjXSJEg">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {/* User location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              title="Your Location"
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3" fill="white"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(24, 24),
                anchor: new window.google.maps.Point(12, 12)
              }}
            />
          )}

          {/* Custom markers */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              title={marker.title}
              icon={marker.icon ? {
                url: marker.icon,
                scaledSize: new window.google.maps.Size(32, 32),
                anchor: new window.google.maps.Point(16, 32)
              } : undefined}
            />
          ))}

          {/* Live location circle for delivery tracking */}
          {markers.find(m => m.isLive) && userLocation && (
            <Circle
              center={userLocation}
              radius={100}
              options={{
                fillColor: '#4285F4',
                fillOpacity: 0.1,
                strokeColor: '#4285F4',
                strokeOpacity: 0.8,
                strokeWeight: 2
              }}
            />
          )}

          {/* Route directions */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#4285F4',
                  strokeWeight: 4,
                  strokeOpacity: 0.8
                }
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      {/* ETA Display */}
      {showETA && eta && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-800">
              ETA: {eta}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map; 