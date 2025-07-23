import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChefHat } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function ApplicationSuccess() {
  const navigate = useNavigate();
  const { cook } = useAuth();

  useEffect(() => {
    // Check if application was actually completed
    if (cook && cook.applicationCompleted) {
      // Auto redirect to dashboard after 5 seconds
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // If application wasn't completed, redirect back to application
      navigate("/cook-application/step-1");
    }
  }, [navigate, cook]);

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        {/* Success Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-[#00955d]/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-[#00955d]" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#00955d] rounded-full flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-semibold text-[#191919] mb-4"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Congratulations!
          </h1>
          <p
            className="text-lg text-[#191919] mb-4 leading-relaxed"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Your application has been submitted successfully
          </p>
          <p
            className="text-base text-[#5e5e5e] leading-relaxed max-w-sm"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            We'll review your application and get back to you within{" "}
            <span className="font-medium text-[#00955d]">
              2-3 business days
            </span>
            . You'll receive an email update once the review is complete.
          </p>
        </div>

        {/* Status Steps */}
        <div className="w-full max-w-sm mb-8">
          <div className="space-y-4">
            {/* Step 1 - Completed */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#00955d] rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p
                  className="text-sm font-medium text-[#191919]"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Application Submitted
                </p>
                <p
                  className="text-xs text-[#5e5e5e]"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Completed just now
                </p>
              </div>
            </div>

            {/* Step 2 - In Progress */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#00955d] rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-[#00955d] rounded-full animate-pulse" />
              </div>
              <div>
                <p
                  className="text-sm font-medium text-[#191919]"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Under Review
                </p>
                <p
                  className="text-xs text-[#5e5e5e]"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  In progress
                </p>
              </div>
            </div>

            {/* Step 3 - Pending */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-gray-200 rounded-full flex-shrink-0" />
              <div>
                <p
                  className="text-sm font-medium text-gray-400"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Approval & Onboarding
                </p>
                <p
                  className="text-xs text-gray-400"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Pending
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="w-full max-w-sm bg-[#00955d]/5 border border-[#00955d]/20 rounded-2xl p-4 mb-8">
          <p
            className="text-sm text-[#00955d] text-center font-medium"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            💡 Tip: Make sure to check your email regularly for updates on your
            application status.
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-5">
        <Button
          onClick={() => navigate("/dashboard")}
          className="w-full h-[56px] bg-[#00955d] hover:bg-[#007a4d] text-white font-medium text-base rounded-[14px] mb-4"
          style={{
            fontFamily:
              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          Continue to Dashboard
        </Button>

        <p
          className="text-center text-sm text-[#5e5e5e]"
          style={{
            fontFamily:
              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          Redirecting automatically in 5 seconds...
        </p>
      </div>
    </div>
  );
}
