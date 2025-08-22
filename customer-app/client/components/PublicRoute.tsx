import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, authReady, isLoading } = useAuth() as any;
  if (!authReady) return null; // wait for initial auth resolution
  if (isLoading) return null;
  if (user) return <Navigate to="/home" replace />;
  return <>{children}</>;
};

export default PublicRoute;
