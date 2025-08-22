import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/home', { replace: true }); // changed from allergy-selection
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    // Close modal after successful submission
    setShowForgotPassword(false);
    setResetEmail("");
    alert("Password reset instructions sent to your email!");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[#191919] text-2xl font-normal">Welcome Back</h1>
          <button
            onClick={() => navigate("/")}
            className="w-8 h-8 rounded-full bg-gray-200 bg-opacity-20 flex items-center justify-center hover:bg-gray-300 hover:bg-opacity-30 transition-colors"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1889 0.397019C10.5794 0.00660635 11.2125 0.00653204 11.603 0.397019C11.9933 0.787515 11.9933 1.42059 11.603 1.81108L7.4135 5.99956L11.603 10.189L11.6713 10.2642C11.992 10.657 11.9692 11.2369 11.603 11.6031C11.2367 11.9693 10.6569 11.9921 10.2641 11.6714L10.1889 11.6031L5.99944 7.41362L1.81096 11.6031C1.42046 11.9934 0.787393 11.9934 0.396897 11.6031C0.00641009 11.2126 0.00648458 10.5795 0.396897 10.189L4.58537 5.99956L0.396897 1.81108C0.00637284 1.42056 0.00637285 0.787543 0.396897 0.397019C0.787421 0.00649491 1.42044 0.00649492 1.81096 0.397019L5.99944 4.5855L10.1889 0.397019Z"
                fill="#3C3C43"
                fillOpacity="0.6"
              />
            </svg>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-[#191919] text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[60px] px-4 rounded-[14px] border border-[#e4e7ec] bg-white text-[#191919] placeholder-[#5e5e5e] focus:outline-none focus:ring-2 focus:ring-[#00955d] focus:border-transparent transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-[#191919] text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[60px] px-4 rounded-[14px] border border-[#e4e7ec] bg-white text-[#191919] placeholder-[#5e5e5e] focus:outline-none focus:ring-2 focus:ring-[#00955d] focus:border-transparent transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-[60px] text-white font-normal text-base rounded-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00955d] focus:ring-offset-2 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#00955d] hover:bg-[#00835a]'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <button
              type="button"
              className="text-[#00955d] text-sm font-normal underline decoration-solid decoration-1 underline-offset-[25%] hover:text-[#00835a] transition-colors"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot password?
            </button>
          </div>
        </form>

        {/* Sign up link */}
        <div className="text-center mt-8">
          <span className="text-[#5e5e5e] font-normal text-sm">
            Don't have an account?
          </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-[#00955d] font-normal text-sm underline decoration-solid decoration-1 underline-offset-[25%] ml-1 hover:text-[#00835a] transition-colors"
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowForgotPassword(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-sm mx-4 mb-0 bg-white rounded-t-3xl p-6 animate-slide-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#191919] text-xl font-normal">
                Reset Password
              </h2>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="w-8 h-8 rounded-full bg-gray-200 bg-opacity-20 flex items-center justify-center hover:bg-gray-300 hover:bg-opacity-30 transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.1889 0.397019C10.5794 0.00660635 11.2125 0.00653204 11.603 0.397019C11.9933 0.787515 11.9933 1.42059 11.603 1.81108L7.4135 5.99956L11.603 10.189L11.6713 10.2642C11.992 10.657 11.9692 11.2369 11.603 11.6031C11.2367 11.9693 10.6569 11.9921 10.2641 11.6714L10.1889 11.6031L5.99944 7.41362L1.81096 11.6031C1.42046 11.9934 0.787393 11.9934 0.396897 11.6031C0.00641009 11.2126 0.00648458 10.5795 0.396897 10.189L4.58537 5.99956L0.396897 1.81108C0.00637284 1.42056 0.00637285 0.787543 0.396897 0.397019C0.787421 0.00649491 1.42044 0.00649492 1.81096 0.397019L5.99944 4.5855L10.1889 0.397019Z"
                    fill="#3C3C43"
                    fillOpacity="0.6"
                  />
                </svg>
              </button>
            </div>

            {/* Description */}
            <p className="text-[#5e5e5e] text-sm mb-6">
              Enter your email address and we'll send you instructions to reset
              your password.
            </p>

            {/* Reset Form */}
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="resetEmail"
                  className="block text-[#191919] text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full h-[50px] px-4 rounded-[14px] border border-[#e4e7ec] bg-white text-[#191919] placeholder-[#5e5e5e] focus:outline-none focus:ring-2 focus:ring-[#00955d] focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Send Instructions Button */}
              <button
                type="submit"
                className="w-full h-[50px] bg-[#00955d] text-white font-normal text-base rounded-[14px] hover:bg-[#00835a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00955d] focus:ring-offset-2"
              >
                Send Instructions
              </button>
            </form>

            {/* Back to Login */}
            <div className="text-center mt-4">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-[#5e5e5e] text-sm font-normal hover:text-[#191919] transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
