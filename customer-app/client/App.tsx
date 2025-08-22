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
// Removed ProtectedRoute
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
              <Route path="/allergy-selection" element={<AllergySelection />} />
              <Route path="/auth-debug" element={<AuthDebug />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
              <Route path="/community" element={<Community />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/help-support" element={<HelpSupport />} />
              <Route path="/terms-policies" element={<TermsPolicies />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cook/:cookId" element={<CookProfile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
