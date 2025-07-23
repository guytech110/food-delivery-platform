import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Camera, Upload, CheckCircle, ArrowLeft, ChefHat } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { veriffService } from '@/lib/veriff';
import { useToast } from '@/hooks/use-toast';

export default function KycKitchen() {
  const navigate = useNavigate();
  const { cook } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!capturedImage || !cook?.id) {
      toast({
        title: "Error",
        description: "Please capture or upload a kitchen photo first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Store the kitchen photo
      const documents = {
        kitchenPhoto: capturedImage
      };

      await veriffService.submitManualVerification(cook.id, documents);
      
      // Update cook verification status
      await veriffService.updateVerificationStatus(cook.id, 'manual_review');
      
      toast({
        title: "Success",
        description: "Kitchen photo captured successfully. Your verification is under review.",
      });

      // Navigate to application or dashboard
      navigate('/cook-application/step-1');
    } catch (error) {
      console.error('Error submitting kitchen photo:', error);
      toast({
        title: "Error",
        description: "Failed to submit kitchen photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <div className="w-full h-[170px] bg-gradient-to-b from-[rgba(80,186,108,0.50)] to-[rgba(80,186,108,0.00)] relative">
        <div className="absolute left-5 top-[60px] flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8 rounded-full bg-black/10 hover:bg-black/20"
          >
            <ArrowLeft className="h-3 w-3 text-black/60" />
          </Button>
          <h1 className="text-2xl font-semibold text-[#191919]">
            Kitchen Photo
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-6 pb-8">
        <Card className="p-6 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-[#191919] mb-2">
              Kitchen Verification
            </h2>
            <p className="text-[#5e5e5e] text-sm">
              Please take a photo of your kitchen to verify your cooking environment
            </p>
          </div>

          {/* Camera/Image Display */}
          <div className="relative mb-6">
            {!capturedImage ? (
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
                {isCameraActive ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <canvas
                      ref={canvasRef}
                      className="hidden"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border-2 border-white border-dashed rounded-lg p-4">
                        <div className="text-center">
                          <ChefHat className="w-8 h-8 text-white mx-auto mb-2" />
                          <p className="text-white text-sm font-medium">Capture your kitchen area</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No kitchen photo captured</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Captured Kitchen"
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetCapture}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                >
                  <X className="h-3 w-3 text-white" />
                </Button>
              </div>
            )}
          </div>

          {/* Kitchen Photo Guidelines */}
          {!capturedImage && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <h3 className="text-sm font-semibold text-green-900 mb-2">Kitchen Photo Guidelines:</h3>
              <ul className="text-xs text-green-800 space-y-1">
                <li>• Show your main cooking area</li>
                <li>• Include cooking equipment and utensils</li>
                <li>• Ensure the area is clean and well-lit</li>
                <li>• Make sure the photo is clear and in focus</li>
                <li>• Avoid showing personal items or sensitive information</li>
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {!capturedImage ? (
              <>
                <Button
                  onClick={isCameraActive ? captureImage : startCamera}
                  className="w-full h-12 bg-[#00955d] hover:bg-[#007a4d] text-white"
                >
                  {isCameraActive ? (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      Capture Kitchen Photo
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      Start Camera
                    </>
                  )}
                </Button>
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button
                    variant="outline"
                    className="w-full h-12"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload from Gallery
                  </Button>
                </div>
              </>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full h-12 bg-[#00955d] hover:bg-[#007a4d] text-white"
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Verification
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#00955d]" />
          <div className="w-3 h-3 rounded-full bg-[#00955d]" />
          <div className="w-3 h-3 rounded-full bg-[#00955d]" />
          <div className="w-3 h-3 rounded-full bg-[#00955d]" />
        </div>

        {/* Completion Message */}
        <div className="text-center mt-4">
          <p className="text-sm text-[#5e5e5e]">
            This completes your KYC verification process
          </p>
        </div>
      </div>
    </div>
  );
} 