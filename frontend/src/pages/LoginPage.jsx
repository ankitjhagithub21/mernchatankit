import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const LoginPage = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <motion.div
        className="hero-content flex-col lg:flex-row-reverse w-full max-w-4xl px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Text Section */}
        <motion.div
          className="text-center lg:text-left mb-8 lg:mb-0 lg:mr-8"
          variants={itemVariants}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-primary"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          >
            Welcome Back!
          </motion.h1>
          <motion.p
            className="py-4 text-base-content/80 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Sign in to continue your conversations. Your messages are waiting.
          </motion.p>
        </motion.div>

        {/* Login Form Card */}
        <motion.div
          className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="card-body p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="you@example.com"
                  id="email"
                  name="email"
                  required
                />
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="••••••••"
                  id="password"
                  name="password"
                  required
                />
              </motion.div>

              {/* Forgot Password */}
              <motion.div variants={itemVariants} className="text-right">
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
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="btn btn-primary mt-2"
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </motion.button>

              {/* Register Link */}
              <motion.div
                className="text-center pt-2"
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-sm text-base-content/70">
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    className="link link-primary font-medium hover:underline"
                  >
                    Create one
                  </Link>
                </p>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;