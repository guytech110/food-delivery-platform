import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, ChefHat } from "lucide-react";

export default function CookApplicationStep1() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Save form data to localStorage or state management
    localStorage.setItem("cookApplicationStep1", JSON.stringify(formData));
    navigate("/cook-application/step-2");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
              Step 1 of 3
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
          <div className="flex-1 h-2 bg-gray-200 rounded-full" />
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
          Personal Information
        </h2>

        <form onSubmit={handleNext} className="space-y-6">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-black"
                style={{
                  fontFamily:
                    "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                First Name *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="h-12 border-2 border-black rounded-lg"
                style={{
                  fontFamily:
                    "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-black"
                style={{
                  fontFamily:
                    "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Last Name *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="h-12 border-2 border-black rounded-lg"
                style={{
                  fontFamily:
                    "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                }}
                required
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-black"
                style={{
                  fontFamily:
                    "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-12 border-2 border-black rounded-lg"
                style={{
                  fontFamily:
                    "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-black"
                style={{
                  fontFamily:
                    "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="h-12 border-2 border-black rounded-lg"
                style={{
                  fontFamily:
                    "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                }}
                required
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3
              className="text-lg font-medium text-black"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Address
            </h3>

            {/* Street Address */}
            <div className="space-y-2">
              <Label
                htmlFor="streetAddress"
                className="text-sm font-medium text-black"
                style={{
                  fontFamily:
                    "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Street Address *
              </Label>
              <Input
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="h-12 border-2 border-black rounded-lg"
                style={{
                  fontFamily:
                    "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                }}
                required
              />
            </div>

            {/* City, State, ZIP */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-5 space-y-2">
                <Label
                  htmlFor="city"
                  className="text-sm font-medium text-black"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  City *
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="h-12 border-2 border-black rounded-lg"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                  required
                />
              </div>
              <div className="col-span-4 space-y-2">
                <Label
                  htmlFor="state"
                  className="text-sm font-medium text-black"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  State *
                </Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="h-12 border-2 border-black rounded-lg"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                  required
                />
              </div>
              <div className="col-span-3 space-y-2">
                <Label
                  htmlFor="zipCode"
                  className="text-sm font-medium text-black"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  ZIP Code *
                </Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="h-12 border-2 border-black rounded-lg"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Action */}
      <div className="p-5">
        <hr className="mb-6 border-gray-200" />
        <div className="flex justify-end">
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
