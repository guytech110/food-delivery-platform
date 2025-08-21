import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './screens/Login';
import { CreateAdmin } from './screens/CreateAdmin';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { UserManagement } from './screens/UserManagement';
import { CookManagement } from './screens/CookManagement';
import { OrderManagement } from './screens/OrderManagement';
import { AnalyticsReports } from './screens/AnalyticsReports';
import { Settings } from './screens/Settings';

function App() {
  const allowCreateAdmin = import.meta.env.DEV && import.meta.env.VITE_DEV_ADMIN_BYPASS === 'true';

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/create-admin" element={allowCreateAdmin ? <CreateAdmin /> : <Navigate to="/login" replace />} />
            
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
    </ErrorBoundary>
  );
}

export default App;
