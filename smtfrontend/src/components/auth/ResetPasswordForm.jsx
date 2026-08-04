import { useState } from "react";
import { Lock, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import AuthHeader from "./AuthHeader";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const getStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getStrength(formData.password);

  const strengthText = [
    "Very Weak",
    "Weak",
    "Medium",
    "Strong",
    "Very Strong",
  ][strength];

  const strengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
  ][strength];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({});
  };

  const validate = () => {
    const err = {};

    if (!formData.password)
      err.password = "Password is required";

    if (formData.password.length < 8)
      err.password = "Minimum 8 characters required";

    if (!formData.confirmPassword)
      err.confirmPassword =
        "Confirm Password is required";

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !==
        formData.confirmPassword
    ) {
      err.confirmPassword =
        "Passwords do not match";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      // API Integration

      setTimeout(() => {
        toast.success(
          "Password Reset Successfully"
        );

        navigate("/login");

        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
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
        }}
        className="w-full max-w-lg"
      >
        <Card className="rounded-3xl border border-orange-100 bg-white/95 p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(249,115,22,0.15)]">

          <AuthHeader
            icon="🔑"
            title="Reset Password"
            subtitle={
              <>
                Create a strong password
                <br />
                <span className="font-semibold text-orange-600">
                  to secure your account
                </span>
              </>
            }
          />

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <PasswordInput
              label="New Password"
              icon={Lock}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter new password"
            />

            <div>
              <div className="mb-2 h-2 rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full transition-all ${strengthColor}`}
                  style={{
                    width: `${(strength / 4) * 100}%`,
                  }}
                />
              </div>

              <p className="text-xs text-gray-500">
                Password Strength :
                <span className="ml-2 font-semibold text-orange-600">
                  {strengthText}
                </span>
              </p>
            </div>

            <PasswordInput
              label="Confirm Password"
              icon={Lock}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Confirm password"
            />

            <Button
              loading={loading}
              className="h-14 rounded-2xl text-base font-semibold"
            >
              {loading
                ? "Updating..."
                : "Reset Password"}
            </Button>
          </form>

          <div className="mt-8 border-t border-orange-100 pt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 font-medium text-orange-600 hover:text-orange-700"
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

export default ResetPasswordForm;