import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import AuthHeader from "./AuthHeader";

import { forgotPassword } from "../../services/authService";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ==========================
  // Validation
  // ==========================
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================
  // Submit
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await forgotPassword({
        email,
      });

      toast.success(
        response.data.message || "OTP sent successfully"
      );

      navigate("/verify-otp", {
        state: {
          email,
        },
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6">
      <motion.div
        initial={{
          opacity: 0,
          x: 60,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.55,
          ease: "easeOut",
        }}
        className="w-full max-w-lg"
      >
        <Card
          className="
            rounded-3xl
            border
            border-orange-100
            bg-white/95
            backdrop-blur-xl
            shadow-[0_20px_60px_rgba(249,115,22,0.15)]
            p-8
          "
        >
          <AuthHeader
            icon="🔐"
            title="Forgot Password"
            subtitle="Enter your registered email address to receive a verification OTP."
          />

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <Input
              label="Email Address"
              icon={Mail}
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({});
              }}
              error={errors.email}
            />

            <Button
              type="submit"
              loading={loading}
              className="h-14 rounded-2xl text-base font-semibold"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>

          <div className="mt-8 border-t border-orange-100 pt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 font-medium text-orange-600 transition hover:text-orange-700"
            >
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordForm;