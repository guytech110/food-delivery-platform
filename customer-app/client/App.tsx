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
import ProtectedRoute from "./components/ProtectedRoute";
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
import React from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <MenuProvider>
            <NotificationProvider>
              <TooltipProvider>
                <ErrorBoundary>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <div className="bg-white">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/allergy-selection" element={<ProtectedRoute><AllergySelection /></ProtectedRoute>} />
                        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                        <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
                        <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
                        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                        <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
                        <Route path="/help-support" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
                        <Route path="/terms-policies" element={<ProtectedRoute><TermsPolicies /></ProtectedRoute>} />
                        <Route path="/subscriptions" element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
                        <Route path="/personal-info" element={<ProtectedRoute><PersonalInfo /></ProtectedRoute>} />
                        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
                        <Route path="/cook/:cookId" element={<ProtectedRoute><CookProfile /></ProtectedRoute>} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </BrowserRouter>
                </ErrorBoundary>
              </TooltipProvider>
            </NotificationProvider>
          </MenuProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
