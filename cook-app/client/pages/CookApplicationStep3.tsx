import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X, ChefHat } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function CookApplicationStep3() {
  const navigate = useNavigate();
  const { cook, updateCook } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    availability: "",
    motivation: "",
    termsAgreed: false,
  });

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem("cookApplicationStep3");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.termsAgreed) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms of service to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!cook?.id) {
      toast({
        title: "Authentication Error",
        description: "Please log in to submit your application.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Save final step data
      localStorage.setItem("cookApplicationStep3", JSON.stringify(formData));

      // Collect all form data from localStorage
      const step1Data = JSON.parse(
        localStorage.getItem("cookApplicationStep1") || "{}",
      );
      const step2Data = JSON.parse(
        localStorage.getItem("cookApplicationStep2") || "{}",
      );
      const step3Data = formData;

      const completeApplication = {
        ...step1Data,
        ...step2Data,
        ...step3Data,
        submittedAt: new Date(),
      };

      // Update cook profile with application data
      await updateCook({
        ...completeApplication,
        applicationCompleted: true,
        onboardingCompleted: true,
      });

      // Store complete application in Firestore for admin review
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      
      await setDoc(doc(db, 'cookApplications', cook.id), {
        cookId: cook.id,
        ...completeApplication,
        status: 'pending',
        submittedAt: new Date(),
      });

      toast({
        title: "Application Submitted!",
        description: "Your cook application has been submitted successfully. We'll review it and get back to you soon.",
      });

      // Clear saved data
      localStorage.removeItem("cookApplicationStep1");
      localStorage.removeItem("cookApplicationStep2");
      localStorage.removeItem("cookApplicationStep3");

      // Small delay to ensure state is updated
      setTimeout(() => {
        // Navigate to success page
        navigate("/application-success");
      }, 500);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    // Save current data before going back
    localStorage.setItem("cookApplicationStep3", JSON.stringify(formData));
    navigate("/cook-application/step-2");
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      termsAgreed: checked,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#00955d]/10 rounded-lg flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-[#00955d]" />
          </div>
          <div>
            <h1
              className="text-lg font-medium text-black"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Cook Application
            </h1>
            <p
              className="text-sm text-[#6b7280]"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Step 3 of 3
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-8 w-8 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="px-5 mb-8">
        <div className="flex gap-2">
          <div className="flex-1 h-2 bg-[#00955d] rounded-full" />
          <div className="flex-1 h-2 bg-[#00955d] rounded-full" />
          <div className="flex-1 h-2 bg-[#00955d] rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5">
        <h2
          className="text-xl font-medium text-black mb-8"
          style={{
            fontFamily:
              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          Availability & Motivation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Availability */}
          <div className="space-y-2">
            <Label
              htmlFor="availability"
              className="text-sm font-medium text-black"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Availability *
            </Label>
            <Textarea
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleTextareaChange}
              placeholder="When are you available to cook? (e.g., Weekends, Evenings, Weekdays...)"
              className="min-h-[120px] border-2 border-black rounded-lg resize-none"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
              required
            />
          </div>

          {/* Motivation */}
          <div className="space-y-2">
            <Label
              htmlFor="motivation"
              className="text-sm font-medium text-black"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Why do you want to join FoodApp? *
            </Label>
            <Textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleTextareaChange}
              placeholder="Tell us why you want to share your food with the community..."
              className="min-h-[120px] border-2 border-black rounded-lg resize-none"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
              required
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3 pt-4">
            <Checkbox
              id="terms"
              checked={formData.termsAgreed}
              onCheckedChange={handleCheckboxChange}
              className="mt-0.5"
            />
            <Label
              htmlFor="terms"
              className="text-sm text-[#6b7280] leading-5 cursor-pointer"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              I agree to FoodApp's terms of service and understand that I need
              to comply with local food safety regulations and licensing
              requirements.
            </Label>
          </div>
        </form>
      </div>

      {/* Bottom Actions */}
      <div className="p-5">
        <hr className="mb-6 border-gray-200" />
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="px-6 py-3 border-2 border-gray-300 text-black font-medium rounded-lg hover:bg-gray-50"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Previous
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-6 py-3 bg-[#00955d] hover:bg-[#007a4d] text-white font-medium rounded-lg"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
}
