import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading, authReady } = useAuth();
  const location = useLocation();

  // Wait until first auth state resolved
  if (!authReady) return null; // could render a spinner if desired

  // Still performing profile/doc fetches
  if (isLoading) return null; // or spinner

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;