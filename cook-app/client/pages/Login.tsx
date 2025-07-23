import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        // Navigate to dashboard after successful login
        navigate("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
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
          Login
        </h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-8">
        <div className="mb-8">
          <h2
            className="text-2xl font-medium text-[#191919] mb-2"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Welcome Back!
          </h2>
          <p
            className="text-base text-[#5e5e5e]"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-[#191919]"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="h-[56px] border-[#e4e7ec] rounded-[14px] text-base"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-[#191919]"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="h-[56px] border-[#e4e7ec] rounded-[14px] text-base pr-12"
                style={{
                  fontFamily:
                    "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                }}
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-[#5e5e5e]" />
                ) : (
                  <Eye className="h-4 w-4 text-[#5e5e5e]" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-[#00955d] font-medium"
              style={{
                fontFamily:
                  "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-[56px] bg-[#00955d] hover:bg-[#007a4d] text-white font-medium text-base rounded-[14px] mt-8"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p
            className="text-sm text-[#5e5e5e]"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#00955d] font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
