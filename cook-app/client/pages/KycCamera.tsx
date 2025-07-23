import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Camera, RotateCcw } from "lucide-react";

export default function KycCamera() {
  const navigate = useNavigate();
  const { documentType } = useParams();

  const getDocumentTitle = () => {
    switch (documentType) {
      case "id-card":
        return "ID Card";
      case "driving-license":
        return "Driving License";
      case "passport":
        return "Passport";
      default:
        return "Document";
    }
  };

  const handleCapture = () => {
    // Simulate successful capture and navigate back to KYC verification
    // In a real app, this would handle the captured image
    alert(`${getDocumentTitle()} captured successfully!`);
    navigate("/kyc");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-5 pt-12">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/40 text-white"
        >
          <X className="h-5 w-5" />
        </Button>
        <h1
          className="text-lg font-medium text-white"
          style={{
            fontFamily:
              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          Capture {getDocumentTitle()}
        </h1>
        <div className="w-10" />
      </div>

      {/* Camera Viewfinder Simulation */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Simulated Camera View */}
        <div className="w-full h-full bg-gray-800 relative flex items-center justify-center">
          {/* Camera placeholder */}
          <div className="text-center text-white/60">
            <Camera className="w-20 h-20 mx-auto mb-4" />
            <p
              className="text-lg"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Camera view would appear here
            </p>
            <p
              className="text-sm mt-2"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Position your {getDocumentTitle().toLowerCase()} in the frame
            </p>
          </div>

          {/* Document frame overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-52 border-2 border-white/50 rounded-lg relative">
              {/* Corner indicators */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-32 left-0 right-0 z-20 px-5">
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 text-center">
          <p
            className="text-white text-sm mb-2"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Make sure your {getDocumentTitle().toLowerCase()} is clearly visible
            and all text is readable
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 pt-4">
        <div className="flex items-center justify-center space-x-8">
          {/* Switch Camera Button (placeholder) */}
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/40 text-white"
          >
            <RotateCcw className="h-6 w-6" />
          </Button>

          {/* Capture Button */}
          <Button
            onClick={handleCapture}
            className="h-20 w-20 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center"
          >
            <div className="h-16 w-16 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
            </div>
          </Button>

          {/* Gallery Button (placeholder) */}
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/40 text-white"
          >
            <div className="h-8 w-8 rounded border-2 border-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
