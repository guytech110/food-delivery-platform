import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './screens/Login';
import { CreateAdmin } from './screens/CreateAdmin';
import { Dashboard } from './components/Dashboard';
import { UserManagement } from './screens/UserManagement';
import { CookManagement } from './screens/CookManagement';
import { OrderManagement } from './screens/OrderManagement';
import { AnalyticsReports } from './screens/AnalyticsReports';
import { Settings } from './screens/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/create-admin" element={<CreateAdmin />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<></>} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="cook-management" element={<CookManagement />} />
            <Route path="order-management" element={<OrderManagement />} />
            <Route path="analytics-reports" element={<AnalyticsReports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
