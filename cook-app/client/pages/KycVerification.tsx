import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, CreditCard, Camera, Shield, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { veriffService } from "@/lib/veriff";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function KycVerification() {
  const navigate = useNavigate();
  const { cook } = useAuth();
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cook?.id) {
      checkVerificationStatus();
    }
  }, [cook]);

  const checkVerificationStatus = async () => {
    try {
      const status = await veriffService.getVerificationStatus(cook!.id);
      if (status) {
        setVerificationStatus(status.status);
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
    }
  };

  const handleStartVerification = async () => {
    if (!cook?.id) {
      toast({
        title: "Error",
        description: "Please log in to start verification",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const sessionId = await veriffService.createSession(cook.id);
      toast({
        title: "Verification Started",
        description: "Starting identity verification process...",
      });
      
      // Navigate to the first step
      navigate("/kyc/identity");
    } catch (error) {
      console.error('Error starting verification:', error);
      toast({
        title: "Error",
        description: "Failed to start verification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Green Gradient Background */}
      <div
        className="absolute top-0 left-0 w-full h-[170px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(80, 186, 108, 0.50) 0%, rgba(80, 186, 108, 0.00) 100%)",
        }}
      />

      {/* Close Button */}
      <div className="absolute top-[60px] left-5 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-8 w-8 rounded-full bg-black/10 hover:bg-black/20"
        >
          <X className="h-3 w-3 text-black/60" />
        </Button>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center px-5 pt-[97px]">
        {/* Illustration */}
        <div className="flex justify-center items-center mb-4">
          {/* ID Card Illustration */}
          <div className="relative w-[197px] h-[197px]">
            {/* Background Circles */}
            <svg
              width="195"
              height="197"
              viewBox="0 0 195 197"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 top-0"
            >
              <path
                d="M97.1046 196.829C150.72 196.829 194.184 152.822 194.184 98.536C194.184 44.2501 150.72 0.242798 97.1046 0.242798C43.489 0.242798 0.0249023 44.2501 0.0249023 98.536C0.0249023 152.822 43.489 196.829 97.1046 196.829Z"
                fill="#D0F1D9"
              />
              <path
                d="M13.9602 152.482C18.7977 152.482 22.7192 148.512 22.7192 143.614C22.7192 138.716 18.7977 134.745 13.9602 134.745C9.12272 134.745 5.20117 138.716 5.20117 143.614C5.20117 148.512 9.12272 152.482 13.9602 152.482Z"
                fill="#BFECCA"
              />
              <path
                d="M10.6127 191.849C13.6014 191.849 16.0242 189.395 16.0242 186.369C16.0242 183.343 13.6014 180.89 10.6127 180.89C7.62399 180.89 5.20117 183.343 5.20117 186.369C5.20117 189.395 7.62399 191.849 10.6127 191.849Z"
                fill="#D3F8DC"
              />
              <path
                d="M170.351 56.2373C178.177 56.2373 184.522 49.8137 184.522 41.8897C184.522 33.9657 178.177 27.542 170.351 27.542C162.525 27.542 156.181 33.9657 156.181 41.8897C156.181 49.8137 162.525 56.2373 170.351 56.2373Z"
                fill="#BFECCA"
              />
              <path
                d="M188.325 10.0166C190.306 10.0166 191.912 8.39023 191.912 6.38398C191.912 4.37773 190.306 2.75134 188.325 2.75134C186.343 2.75134 184.737 4.37773 184.737 6.38398C184.737 8.39023 186.343 10.0166 188.325 10.0166Z"
                fill="#BEEBC9"
              />
            </svg>

            {/* ID Card */}
            <svg
              width="195"
              height="197"
              viewBox="0 0 195 197"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 top-0"
            >
              <path
                d="M149.09 37.9765C148.144 37.4973 143.648 35.2214 142.583 34.7423C141.637 34.2632 140.336 34.383 138.798 35.1017L49.4775 83.4943C46.5199 85.0515 44.1538 88.645 44.1538 91.6396V156.083C44.1538 157.401 44.627 158.359 45.4552 158.958C46.4016 159.557 51.1338 161.713 51.8436 162.192C52.7901 162.791 54.2097 162.791 55.866 161.953L145.304 113.68C148.262 112.123 150.628 108.529 150.628 105.534V40.9711C150.628 39.5337 150.037 38.4556 149.09 37.9765Z"
                fill="#29B580"
              />
              <path
                d="M142.584 34.7423C141.637 34.2632 140.336 34.383 138.798 35.1017L49.4779 83.4943C46.7569 84.9317 44.5091 88.2856 44.2725 91.1604C44.3908 92.2385 44.864 93.077 45.5738 93.5561C46.5203 94.155 51.2524 96.3111 51.9623 96.7903C52.9087 97.3892 54.3284 97.3892 55.9846 96.5507L145.423 48.2779C148.144 46.8405 150.392 43.4865 150.628 40.6117C150.51 39.4139 150.037 38.4556 149.091 38.0963C148.144 37.6171 143.53 35.2214 142.584 34.7423Z"
                fill="#25D390"
              />
              <path
                d="M145.304 113.798L55.8657 162.071C52.9081 163.628 50.542 162.431 50.542 159.556V95.1122C50.542 92.1176 52.9081 88.5241 55.8657 86.9669L145.304 38.6941C148.262 37.1369 150.628 38.3348 150.628 41.2096V105.653C150.628 108.648 148.262 112.241 145.304 113.798Z"
                fill="#338F6C"
              />
              <path
                d="M91.0029 115.356L66.5138 128.293C65.0942 129.011 63.9111 128.532 63.9111 126.975V97.7477C63.9111 96.3103 65.0942 94.3937 66.5138 93.675L90.8846 80.7384C92.3043 80.0197 93.4873 80.4988 93.4873 82.056V111.283C93.6056 112.84 92.4226 114.637 91.0029 115.356Z"
                fill="white"
              />
              <path
                d="M93.6056 112.244C91.1212 106.135 85.3243 103.979 78.5809 107.573C72.1925 111.046 66.6321 118.712 63.9111 126.978V128.056C63.9111 129.014 64.7393 129.373 65.6857 128.894L91.9494 114.879C92.8958 114.4 93.6056 113.202 93.6056 112.244Z"
                fill="#635C99"
              />
              <path
                d="M78.58 114.16C76.8054 115.118 75.3857 114.399 75.3857 112.603V108.29C75.3857 106.494 76.8054 104.218 78.58 103.259C80.3545 102.301 81.7742 103.02 81.7742 104.817V109.129C81.7742 110.926 80.3545 113.202 78.58 114.16Z"
                fill="#E5B641"
              />
              <path
                d="M84.2207 103.253C86.7415 97.9474 86.2552 92.4138 83.1344 90.8939C80.0136 89.3739 75.4402 92.4432 72.9194 97.7492C70.3985 103.055 70.8849 108.589 74.0056 110.109C77.1264 111.629 81.6999 108.559 84.2207 103.253Z"
                fill="#FFCE47"
              />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center px-2 mb-6">
          <h1
            className="text-2xl font-semibold text-[#191919] mb-4"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Let's verify your profile
          </h1>
          <p
            className="text-base text-[#5e5e5e] leading-normal"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            please submit the following documents to verify your profile.
          </p>
        </div>

        {/* Verification Status */}
        {verificationStatus && (
          <div className="w-full mb-6 p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              {verificationStatus === 'approved' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : verificationStatus === 'rejected' ? (
                <X className="w-5 h-5 text-red-600" />
              ) : (
                <Shield className="w-5 h-5 text-blue-600" />
              )}
              <div>
                <h3 className="font-semibold text-black">
                  {verificationStatus === 'approved' && 'Verification Approved'}
                  {verificationStatus === 'rejected' && 'Verification Rejected'}
                  {verificationStatus === 'pending' && 'Verification Pending'}
                  {verificationStatus === 'manual_review' && 'Under Manual Review'}
                </h3>
                <p className="text-sm text-gray-600">
                  {verificationStatus === 'approved' && 'Your identity has been verified successfully'}
                  {verificationStatus === 'rejected' && 'Please review and resubmit your documents'}
                  {verificationStatus === 'pending' && 'Your verification is being processed'}
                  {verificationStatus === 'manual_review' && 'Your documents are being reviewed manually'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Veriff Integration Button */}
        <Button
          onClick={handleStartVerification}
          disabled={isLoading || verificationStatus === 'approved'}
          className="w-full h-[60px] bg-[#00955d] hover:bg-[#007a4d] text-white font-semibold text-base capitalize mb-6"
          style={{
            fontFamily:
              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          {isLoading ? "Starting Verification..." : "Start Veriff Verification"}
        </Button>

        {/* Verification Steps */}
        <div className="w-full space-y-11 mb-11">
          {/* Step 1: Valid ID */}
          <div
            className="flex items-start justify-between cursor-pointer"
            onClick={() => navigate("/kyc/identity")}
          >
            <div className="flex items-start gap-4">
              <CreditCard className="w-6 h-6 text-[#00955d] flex-shrink-0 mt-1" />
              <div>
                <h3
                  className="text-base font-semibold text-black mb-4"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Take a picture of your valid ID
                </h3>
                <p
                  className="text-base font-medium text-[#5f6b87] max-w-[258px]"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  To check your personal information are correct
                </p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-[#00955d] flex-shrink-0" />
          </div>

          {/* Step 2: Selfie */}
          <div
            className="flex items-start justify-between cursor-pointer"
            onClick={() => navigate("/kyc/selfie")}
          >
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-[#00955d] flex-shrink-0 mt-1" />
              <div>
                <h3
                  className="text-base font-semibold text-black mb-4"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Take a selfie of yourself
                </h3>
                <p
                  className="text-base font-medium text-[#5f6b87] max-w-[258px]"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  To match your face to your ID photo
                </p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-[#00955d] flex-shrink-0" />
          </div>

          {/* Step 3: Kitchen */}
          <div
            className="flex items-start justify-between cursor-pointer"
            onClick={() => navigate("/kyc/kitchen")}
          >
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-[#00955d] flex-shrink-0 mt-1" />
              <div>
                <h3
                  className="text-base font-semibold text-black mb-4"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Take a picture of your kitchen
                </h3>
                <p
                  className="text-base font-medium text-[#5f6b87] max-w-[258px]"
                  style={{
                    fontFamily:
                      "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  To verify your cooking environment
                </p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-[#00955d] flex-shrink-0" />
          </div>
        </div>

        {/* Skip Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/cook-application/step-1")}
          className="w-full h-[60px] text-[#565b66] opacity-60 font-semibold text-base capitalize hover:opacity-80"
          style={{
            fontFamily:
              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          Skip For Now
        </Button>
      </div>
    </div>
  );
}
