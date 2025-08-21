import React from "react";
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OrderProvider>
          <MenuProvider>
            <NotificationProvider>
              <ErrorBoundary>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <div className="bg-white">
                    <Routes>
                      {/* Public routes */}
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />

                      {/* Auth-protected routes */}
                      <Route
                        path="/onboarding"
                        element={
                          <ProtectedRoute>
                            <Onboarding />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/kyc"
                        element={
                          <ProtectedRoute>
                            <KycVerification />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/kyc/identity"
                        element={
                          <ProtectedRoute>
                            <KycIdentity />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/kyc/selfie"
                        element={
                          <ProtectedRoute>
                            <KycSelfie />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/kyc/kitchen"
                        element={
                          <ProtectedRoute>
                            <KycKitchen />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/kyc/camera/:documentType"
                        element={
                          <ProtectedRoute>
                            <KycCamera />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/cook-application"
                        element={
                          <ProtectedRoute>
                            <Navigate to="/cook-application/step-1" replace />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/cook-application/step-1"
                        element={
                          <ProtectedRoute>
                            <CookApplicationStep1 />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/cook-application/step-2"
                        element={
                          <ProtectedRoute>
                            <CookApplicationStep2 />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/cook-application/step-3"
                        element={
                          <ProtectedRoute>
                            <CookApplicationStep3 />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/application-success"
                        element={
                          <ProtectedRoute>
                            <ApplicationSuccess />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/new-item"
                        element={
                          <ProtectedRoute>
                            <NewItem />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/edit-item/:itemId"
                        element={
                          <ProtectedRoute>
                            <EditItem />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/delivery-tracking/:orderId"
                        element={
                          <ProtectedRoute>
                            <DeliveryTracking />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/menu"
                        element={
                          <ProtectedRoute>
                            <Menu />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/orders"
                        element={
                          <ProtectedRoute>
                            <Orders />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/order-details/:orderId"
                        element={
                          <ProtectedRoute>
                            <OrderDetails />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/earnings"
                        element={
                          <ProtectedRoute>
                            <Earnings />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/community"
                        element={
                          <ProtectedRoute>
                            <Community />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <Index />
                          </ProtectedRoute>
                        }
                      />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </BrowserRouter>
              </ErrorBoundary>
            </NotificationProvider>
          </MenuProvider>
        </OrderProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

createRoot(document.getElementById("root")!).render(<App />);
