import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, authReady, isLoading } = useAuth() as any;
  const location = useLocation();

  if (!authReady) return null;
  if (isLoading) return null;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return <>{children}</>;
};

export default ProtectedRoute;