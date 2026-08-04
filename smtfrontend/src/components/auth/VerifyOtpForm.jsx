import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import Button from "../ui/Button";
import AuthHeader from "./AuthHeader";

import toast from "react-hot-toast";
import {
  verifyResetOtp,
  forgotPassword,
} from "../../services/authService";

const VerifyOtpForm = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const inputs = useRef([]);

  useEffect(() => {
  if (!email) {
    navigate("/forgot-password", {
      replace: true,
    });
  }
}, [email, navigate]);
  
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

const handleChange = (value, index) => {
  if (!/^\d?$/.test(value)) return;

  const updated = [...otp];
  updated[index] = value;
  setOtp(updated);

  if (updated.join("").length === 6) {
    setTimeout(() => {
      document.querySelector("form")?.requestSubmit();
    }, 200);
  }

  if (value && index < 5) {
    inputs.current[index + 1].focus();
  }
};

 const handleKeyDown = (e, index) => {
  if (e.key === "Backspace") {
    if (otp[index]) {
      const updated = [...otp];
      updated[index] = "";
      setOtp(updated);
    } else if (index > 0) {
      inputs.current[index - 1].focus();

      const updated = [...otp];
      updated[index - 1] = "";
      setOtp(updated);
    }
  }
};

  const handlePaste = (e) => {
  e.preventDefault();

  const pasted = e.clipboardData
    .getData("text")
    .trim()
    .slice(0, 6)
    .split("");

  const updated = [...otp];

  pasted.forEach((char, index) => {
    updated[index] = char;
  });

  setOtp(updated);

  if (updated.join("").length === 6) {
    setTimeout(() => {
      document.querySelector("form")?.requestSubmit();
    }, 200);
  } else {
    inputs.current[pasted.length]?.focus();
  }
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  const otpCode = otp.join("");

  if (otpCode.length !== 6) {
    return toast.error("Please enter complete OTP");
  }

  try {
    setLoading(true);

    const response = await verifyResetOtp({
      email,
      otp: otpCode,
    });

    toast.success(
      response.data.message || "OTP Verified Successfully"
    );

    navigate("/reset-password", {
      state: { email },
    });
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Invalid OTP"
    );
  } finally {
    setLoading(false);
  }
};

const handleResendOtp = async () => {
  try {
    await forgotPassword({ email });

    toast.success("OTP Sent Successfully");

    setOtp(["", "", "", "", "", ""]);

    setTimer(60);

    inputs.current[0]?.focus();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to resend OTP"
    );
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="rounded-3xl border border-orange-100 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(249,115,22,0.15)] p-8">
          <AuthHeader
           
  icon="📩"
  title="Verify OTP"
  subtitle={
    <>
      Enter the 6-digit verification code
      <br />
      <span className="font-semibold text-orange-600">
        {email}
      </span>
    </>
  }
/>
          

          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >
            <div
              className="flex justify-between gap-3"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
  key={index}
  ref={(el) => (inputs.current[index] = el)}
  type="text"
  inputMode="numeric"
  autoComplete="one-time-code"
  maxLength={1}
  value={digit}
  onChange={(e) => handleChange(e.target.value, index)}
  onKeyDown={(e) => handleKeyDown(e, index)}
  className="h-14 w-14 rounded-2xl border border-orange-200 text-center text-xl font-bold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
/>
              ))}
            </div>

           <Button
  type="submit"
  loading={loading}
  className="mt-8 h-14 rounded-2xl text-base font-semibold"
>
  {loading ? "Verifying OTP..." : "Verify OTP"}
</Button>
          </form>

          <div className="mt-6 text-center">
            {timer > 0 ? (
              <p className="text-gray-500">
                Resend OTP in{" "}
                <span className="font-semibold text-orange-600">
                  {timer}s
                </span>
              </p>
            ) : (
             <button
  type="button"
  onClick={handleResendOtp}
  className="font-semibold text-orange-600 hover:underline"
>
  Resend OTP
</button>
            )}
          </div>

          <div className="mt-8 border-t border-orange-100 pt-6 text-center">
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-2 font-medium text-orange-600 hover:text-orange-700"
            >
              ← Back
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default VerifyOtpForm;