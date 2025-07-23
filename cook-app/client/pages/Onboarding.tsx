import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function OnboardingRouter() {
  const navigate = useNavigate();
  const { cook, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!cook) {
      // No cook data, redirect to login
      navigate("/login");
      return;
    }

    // Check onboarding status
    const needsKYC = !cook.isVerified;
    const needsApplication = !cook.applicationCompleted;

    if (needsKYC) {
      // Redirect to KYC verification first
      navigate("/kyc");
      return;
    }

    if (needsApplication) {
      // Redirect to cook application
      navigate("/cook-application/step-1");
      return;
    }

    // Both KYC and application completed, redirect to dashboard
    navigate("/dashboard");
  }, [cook, isLoading, navigate]);

  // Show loading while checking onboarding status
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#00955d]" />
        <p className="text-[#5e5e5e] text-sm">Setting up your account...</p>
      </div>
    </div>
  );
}
