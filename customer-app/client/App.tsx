import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { OrderProvider } from "./contexts/OrderContext";
import { MenuProvider } from "./contexts/MenuContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { maybeEnableBypassFromQuery } from "./lib/authBypass";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AllergySelection from "./pages/AllergySelection";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderTracking from "./pages/OrderTracking";
import Community from "./pages/Community";
import Wallet from "./pages/Wallet";
import HelpSupport from "./pages/HelpSupport";
import TermsPolicies from "./pages/TermsPolicies";
import Subscriptions from "./pages/Subscriptions";
import PersonalInfo from "./pages/PersonalInfo";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import CookProfile from "./pages/CookProfile";
import AuthDebug from "./pages/AuthDebug";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

// Initialize auth bypass check at app boot
maybeEnableBypassFromQuery();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <MenuProvider>
            <NotificationProvider>
              <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
              <Route path="/allergy-selection" element={<ProtectedRoute><AllergySelection /></ProtectedRoute>} />
              <Route path="/auth-debug" element={<AuthDebug />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
              <Route path="/order-tracking/:orderId" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
              <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
              <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
              <Route path="/help-support" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
              <Route path="/terms-policies" element={<ProtectedRoute><TermsPolicies /></ProtectedRoute>} />
              <Route path="/subscriptions" element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
              <Route path="/personal-info" element={<ProtectedRoute><PersonalInfo /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
              <Route path="/cook/:cookId" element={<ProtectedRoute><CookProfile /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
              </TooltipProvider>
            </NotificationProvider>
          </MenuProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
