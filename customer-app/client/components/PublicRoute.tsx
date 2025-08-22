import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user /*, authReady*/, isLoading } = useAuth() as any;
  // If you later expose authReady from context, you can gate on it. For now we just ensure not loading.
  if (isLoading) return null;
  if (user) {
    const location = useLocation();
    const redirectTo = (location.state as any)?.from || '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
