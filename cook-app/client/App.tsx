import React from "react";
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { OrderProvider } from "./contexts/OrderContext";
import { MenuProvider } from "./contexts/MenuContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import Index, { LandingPage } from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import KycVerification from "./pages/KycVerification";
import KycIdentity from "./pages/KycIdentity";
import KycSelfie from "./pages/KycSelfie";
import KycKitchen from "./pages/KycKitchen";
import KycCamera from "./pages/KycCamera";
import CookApplication from "./pages/CookApplication";
import CookApplicationStep1 from "./pages/CookApplicationStep1";
import CookApplicationStep2 from "./pages/CookApplicationStep2";
import CookApplicationStep3 from "./pages/CookApplicationStep3";
import ApplicationSuccess from "./pages/ApplicationSuccess";
import NewItem from "./pages/NewItem";
import EditItem from "./pages/EditItem";
import DeliveryTracking from "./pages/DeliveryTracking";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Earnings from "./pages/Earnings";
import Profile from "./pages/Profile";
import Community from "./pages/Community";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OrderProvider>
          <MenuProvider>
            <NotificationProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/kyc" element={<KycVerification />} />
          <Route path="/kyc/identity" element={<KycIdentity />} />
          <Route path="/kyc/selfie" element={<KycSelfie />} />
          <Route path="/kyc/kitchen" element={<KycKitchen />} />
          <Route path="/kyc/camera/:documentType" element={<KycCamera />} />
          <Route path="/cook-application" element={<CookApplicationStep1 />} />
          <Route
            path="/cook-application/step-1"
            element={<CookApplicationStep1 />}
          />
          <Route
            path="/cook-application/step-2"
            element={<CookApplicationStep2 />}
          />
          <Route
            path="/cook-application/step-3"
            element={<CookApplicationStep3 />}
          />
          <Route path="/application-success" element={<ApplicationSuccess />} />
          <Route path="/new-item" element={<NewItem />} />
          <Route path="/edit-item/:itemId" element={<EditItem />} />
          <Route path="/delivery-tracking/:orderId" element={<DeliveryTracking />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/community" element={<Community />} />
          <Route path="/dashboard" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
            </NotificationProvider>
          </MenuProvider>
        </OrderProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

createRoot(document.getElementById("root")!).render(<App />);
