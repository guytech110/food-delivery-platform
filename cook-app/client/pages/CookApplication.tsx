import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ChefHat, Clock, MapPin, DollarSign } from "lucide-react";

export default function CookApplication() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cuisineSpecialty: "",
    experience: "",
    description: "",
    availability: "",
    location: "",
    priceRange: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement application submission logic
    // Show success and navigate to dashboard
    alert(
      "Application submitted successfully! We'll review it and get back to you.",
    );
    navigate("/dashboard");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-5 pt-12">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-10 w-10 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1
          className="text-xl font-medium text-[#191919]"
          style={{
            fontFamily:
              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          Cook Application
        </h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-4">
        {/* Header Icon and Text */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#00955d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-10 h-10 text-[#00955d]" />
          </div>
          <h2
            className="text-2xl font-semibold text-[#191919] mb-2"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Become a Cook
          </h2>
          <p
            className="text-base text-[#5e5e5e]"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Share your culinary passion with hungry customers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cuisine Specialty */}
          <div className="space-y-2">
            <Label
              htmlFor="cuisineSpecialty"
              className="text-sm font-medium text-[#191919] flex items-center gap-2"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              <ChefHat className="w-4 h-4 text-[#00955d]" />
              Cuisine Specialty
            </Label>
            <Input
              id="cuisineSpecialty"
              name="cuisineSpecialty"
              value={formData.cuisineSpecialty}
              onChange={handleInputChange}
              placeholder="e.g., Italian, Mexican, Asian Fusion"
              className="h-[56px] border-[#e4e7ec] rounded-[14px] text-base"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
              required
            />
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label
              htmlFor="experience"
              className="text-sm font-medium text-[#191919] flex items-center gap-2"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              <Clock className="w-4 h-4 text-[#00955d]" />
              Years of Experience
            </Label>
            <Input
              id="experience"
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="e.g., 5"
              className="h-[56px] border-[#e4e7ec] rounded-[14px] text-base"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label
              htmlFor="location"
              className="text-sm font-medium text-[#191919] flex items-center gap-2"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              <MapPin className="w-4 h-4 text-[#00955d]" />
              Location/Area You Serve
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Downtown, Manhattan, 5-mile radius"
              className="h-[56px] border-[#e4e7ec] rounded-[14px] text-base"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
              required
            />
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label
              htmlFor="priceRange"
              className="text-sm font-medium text-[#191919] flex items-center gap-2"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              <DollarSign className="w-4 h-4 text-[#00955d]" />
              Price Range per Meal
            </Label>
            <Input
              id="priceRange"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleInputChange}
              placeholder="e.g., $15-25"
              className="h-[56px] border-[#e4e7ec] rounded-[14px] text-base"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
              required
            />
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label
              htmlFor="availability"
              className="text-sm font-medium text-[#191919]"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Availability
            </Label>
            <Input
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              placeholder="e.g., Mon-Fri 6PM-10PM, Weekends"
              className="h-[56px] border-[#e4e7ec] rounded-[14px] text-base"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-[#191919]"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Tell us about yourself and your cooking
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Share your passion for cooking, signature dishes, and what makes your food special..."
              className="min-h-[120px] border-[#e4e7ec] rounded-[14px] text-base resize-none"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-[56px] bg-[#00955d] hover:bg-[#007a4d] text-white font-medium text-base rounded-[14px] mt-8"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Submit Application
          </Button>
        </form>

        {/* Info Note */}
        <div className="mt-6 mb-8">
          <p
            className="text-sm text-[#5e5e5e] text-center leading-[20px]"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            We'll review your application within 2-3 business days and send you
            an update via email.
          </p>
        </div>
      </div>
    </div>
  );
}
