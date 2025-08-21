import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      // Directly create Firebase Auth user and profile doc
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      await setDoc(doc(db, 'users', cred.user.uid), {
        name,
        email,
        role: 'customer',
        allergies: [],
        deliveryAddress: '',
        phoneNumber: '',
        createdAt: new Date()
      }, { merge: true });

      // Navigate to protected onboarding route (never to /login)
      navigate("/allergy-selection", { replace: true });
    } catch (error: any) {
      let message = 'An unexpected error occurred. Please try again.';
      if (error?.code === 'auth/email-already-in-use') message = 'Email already in use';
      else if (error?.code === 'auth/invalid-email') message = 'Invalid email address';
      else if (error?.code === 'auth/weak-password') message = 'Password should be at least 6 characters';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[#191919] text-2xl font-normal">
            Create Account
          </h1>
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

        {/* Sign-up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-[#191919] text-sm font-medium"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[60px] px-4 rounded-[14px] border border-[#e4e7ec] bg-white text-[#191919] placeholder-[#5e5e5e] focus:outline-none focus:ring-2 focus:ring-[#00955d] focus:border-transparent transition-colors"
              placeholder="Enter your full name"
              required
            />
          </div>

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
              placeholder="Create a password"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-[#191919] text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-[60px] px-4 rounded-[14px] border border-[#e4e7ec] bg-white text-[#191919] placeholder-[#5e5e5e] focus:outline-none focus:ring-2 focus:ring-[#00955d] focus:border-transparent transition-colors"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Sign Up Button */}
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
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login link */}
        <div className="text-center mt-8">
          <span className="text-[#5e5e5e] font-normal text-sm">
            Already have an account?
          </span>
          <button
            onClick={() => navigate("/login")}
            className="text-[#00955d] font-normal text-sm underline decoration-solid decoration-1 underline-offset-[25%] ml-1 hover:text-[#00835a] transition-colors"
          >
            Login
          </button>
        </div>

        {/* Terms and Privacy */}
        <p className="w-full text-[#5e5e5e] text-center font-normal text-xs leading-normal mt-6">
          <span>By creating an account you agree to our </span>
          <span className="text-[#00955d] underline decoration-solid decoration-1 underline-offset-[25%]">
            Terms of Service
          </span>
          <span> and </span>
          <span className="text-[#00955d] underline decoration-solid decoration-1 underline-offset-[25%]">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}
