import { useState, useEffect, useRef } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { uploadImage, validateImageFile } from "../utils/fileUpload";

export default function CookApplicationStep2() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    cookingExperience: "",
    cookingSpecialties: "",
    kitchenType: "",
    cookingCardUrl: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem("cookApplicationStep2");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData({
        cookingExperience: parsed.cookingExperience || "",
        cookingSpecialties: parsed.cookingSpecialties || "",
        kitchenType: parsed.kitchenType || "",
        cookingCardUrl: parsed.cookingCardUrl || "",
      });
      if (parsed.cookingCardUrl) {
        setImagePreview(parsed.cookingCardUrl);
      }
    }
  }, []);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    // If a new image is selected but not uploaded yet, upload it first
    if (selectedImage && !formData.cookingCardUrl) {
      const uploaded = await handleUploadInternal();
      if (!uploaded) return; // Abort navigation on failure
    }

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

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      toast({ title: "Invalid file", description: validation.message, variant: "destructive" });
      return;
    }

    setSelectedImage(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadInternal = async (): Promise<boolean> => {
    if (!selectedImage) return true; // Nothing to upload
    setIsUploading(true);
    try {
      const result = await uploadImage(selectedImage, "cooking-cards");
      if (result.success && result.url) {
        setFormData((prev) => ({ ...prev, cookingCardUrl: result.url }));
        setImagePreview(result.url);
        toast({ title: "Uploaded", description: "Cooking card uploaded successfully." });
        return true;
      } else {
        toast({ title: "Upload failed", description: result.message, variant: "destructive" });
        return false;
      }
    } catch (error) {
      toast({ title: "Upload error", description: "Failed to upload image.", variant: "destructive" });
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, cookingCardUrl: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
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

          {/* Cooking Card Upload */}
          <div className="space-y-2">
            <Label
              htmlFor="cookingCard"
              className="text-sm font-medium text-black"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Cooking Card (optional)
            </Label>
            <div className="w-full h-[242px] bg-[#f2f2f2] border border-[#e6e6e6] rounded-[10px] flex flex-col items-center justify-center gap-5 relative overflow-hidden">
              <input
                ref={fileInputRef}
                id="cookingCard"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Cooking Card Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p>Uploading...</p>
                      </div>
                    </div>
                  )}
                  {selectedImage && !isUploading && !formData.cookingCardUrl && (
                    <button
                      type="button"
                      onClick={handleUploadInternal}
                      className="absolute bottom-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Upload
                    </button>
                  )}
                  {formData.cookingCardUrl && (
                    <span className="absolute bottom-2 left-2 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">Uploaded</span>
                  )}
                </div>
              ) : (
                <>
                  <svg
                    width="35"
                    height="34"
                    viewBox="0 0 35 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.4457 31.3042L21.8957 17.7042L28.6957 24.5042M7.4457 31.3042H24.4457C27.2624 31.3042 29.5457 29.0208 29.5457 26.2042V17.7042M7.4457 31.3042C4.62905 31.3042 2.3457 29.0208 2.3457 26.2042V9.20419C2.3457 6.38754 4.62905 4.10419 7.4457 4.10419H18.4957M27.8457 12.3125L27.8457 7.50419M27.8457 7.50419L27.8457 2.69586M27.8457 7.50419L23.0374 7.50419M27.8457 7.50419L32.654 7.50419M12.5457 11.7542C12.5457 13.1625 11.404 14.3042 9.9957 14.3042C8.58738 14.3042 7.4457 13.1625 7.4457 11.7542C7.4457 10.3459 8.58738 9.20419 9.9957 9.20419C11.404 9.20419 12.5457 10.3459 12.5457 11.7542Z"
                      stroke="#61646B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-[#61646B] text-lg font-medium">Add Cooking Card</p>
                    <p className="text-[#61646B] text-sm">Upload a photo of your cooking card</p>
                  </div>
                </>
              )}
            </div>
            {formData.cookingCardUrl && (
              <p className="text-xs text-green-700">A cooking card image has been uploaded.</p>
            )}
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
