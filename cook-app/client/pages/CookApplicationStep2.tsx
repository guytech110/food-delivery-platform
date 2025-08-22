import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, ChefHat } from "lucide-react";

export default function CookApplicationStep2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cookingExperience: "",
    cookingSpecialties: "",
    kitchenType: "",
  });

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem("cookApplicationStep2");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Save form data to localStorage
    localStorage.setItem("cookApplicationStep2", JSON.stringify(formData));
    navigate("/cook-application/step-3");
  };

  const handlePrevious = () => {
    // Save current data before going back
    localStorage.setItem("cookApplicationStep2", JSON.stringify(formData));
    navigate("/cook-application/step-1");
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      kitchenType: value,
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
              Step 2 of 3
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
          <div className="flex-1 h-2 bg-gray-200 rounded-full" />
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
          Cooking Experience
        </h2>

        <form onSubmit={handleNext} className="space-y-6">
          {/* Cooking Experience */}
          <div className="space-y-2">
            <Label
              htmlFor="cookingExperience"
              className="text-sm font-medium text-black"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Cooking Experience *
            </Label>
            <Textarea
              id="cookingExperience"
              name="cookingExperience"
              value={formData.cookingExperience}
              onChange={handleTextareaChange}
              placeholder="Tell us about your cooking experience, background, and any relevant training..."
              className="min-h-[120px] border-2 border-black rounded-lg resize-none"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
              required
            />
          </div>

          {/* Cooking Specialties */}
          <div className="space-y-2">
            <Label
              htmlFor="cookingSpecialties"
              className="text-sm font-medium text-black"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Cooking Specialties *
            </Label>
            <Textarea
              id="cookingSpecialties"
              name="cookingSpecialties"
              value={formData.cookingSpecialties}
              onChange={handleTextareaChange}
              placeholder="What types of food do you specialize in? (e.g., Italian, Mexican, Vegan, Desserts...)"
              className="min-h-[120px] border-2 border-black rounded-lg resize-none"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
              required
            />
          </div>

          {/* Kitchen Type */}
          <div className="space-y-2">
            <Label
              htmlFor="kitchenType"
              className="text-sm font-medium text-black"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Kitchen Type *
            </Label>
            <Select
              value={formData.kitchenType}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger className="h-12 border-2 border-black rounded-lg">
                <SelectValue placeholder="Select kitchen type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home Kitchen</SelectItem>
                <SelectItem value="commercial">Commercial Kitchen</SelectItem>
                <SelectItem value="shared">Shared Kitchen Space</SelectItem>
                <SelectItem value="food-truck">Food Truck</SelectItem>
                <SelectItem value="catering">Catering Kitchen</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
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
            onClick={handleNext}
            className="px-8 py-3 bg-[#00955d] hover:bg-[#007a4d] text-white font-medium rounded-lg"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
