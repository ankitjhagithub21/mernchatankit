import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      const res = await api.post("/auth/login", formObject);
      setUser(res.data.user);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-4xl px-4">
        
        {/* Left Text Section */}
        <div className="text-center lg:text-left mb-8 lg:mb-0 lg:mr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Welcome Back!
          </h1>
          <p className="py-4 text-base-content/80 max-w-md mx-auto lg:mx-0">
            Sign in to continue your conversations. Your messages are waiting.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Email */}
              <div>
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input outline-none w-full"
                  placeholder="you@example.com"
                  id="email"
                  name="email"
                  required
                />
              </div>

              {/* Password with Show/Hide */}
              <div>
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input outline-none w-full pr-10"
                    placeholder="••••••••"
                    id="password"
                    name="password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast("Password reset not implemented yet.", {
                      icon: "⚠️",
                    });
                  }}
                  className="text-sm link link-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary mt-2"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              {/* Register Link */}
              <div className="text-center pt-2">
                <p className="text-sm text-base-content/70">
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    className="link link-primary font-medium hover:underline"
                  >
                    Create one
                  </Link>
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
