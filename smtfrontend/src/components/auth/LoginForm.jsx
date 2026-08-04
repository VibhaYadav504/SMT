import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
 import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";

import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";

import { login } from "../../services/authService";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";


const LoginForm = () => {
  const navigate = useNavigate();
const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ==========================
  // Handle Input Change
  // ==========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==========================
  // Validation
  // ==========================
  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================
  // Login Submit
  // ==========================
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      console.log("Login Response:", response.data);

      const { user, token } = response.data.data;
       setUser(user);
      if (formData.remember) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      }
      toast.success("Login Successful");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);

    toast.error(
  error.response?.data?.message || "Login Failed"
);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6">
      <motion.div
       initial={{
opacity:0,
x:60,
scale:0.96
}}
      animate={{
opacity:1,
x:0,
scale:1
}}
       transition={{
duration:0.55,
ease:"easeOut"
}}
       className="w-full max-w-lg"
      >
        <Card
  className="
    rounded-3xl
    border
    border-orange-100
    bg-white/95
    shadow-[0_20px_60px_rgba(249,115,22,0.15)]
    backdrop-blur-xl
    p-8
  "
>
          <AuthHeader
            title="Welcome Back 👋"
            subtitle="Login to your Skill Manthan Admin Panel"
          />

          <form
            onSubmit={handleSubmit}
           className="mt-8 space-y-6"
          >
            <Input
            label="Email Address"
              name="email"
              placeholder="Enter your email address"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter password"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <div className="mt-2 flex items-center justify-between">
              <Checkbox
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                label="Remember Me"
              />

            

<Link
  to="/forgot-password"
  className="text-sm font-semibold text-orange-600 transition-all duration-300 hover:text-orange-700 hover:underline"
>
  Forgot Password?
</Link>
            </div>

           <Button
type="submit"
loading={loading}
className="mt-3 h-14 rounded-2xl text-base font-semibold"
>
              {loading ? "Logging In..." : "Login"}
            </Button>
          </form>

          <AuthFooter
            text="Don't have an account?"
            link="/signup"
            linkText="Create Account"
          />
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginForm;