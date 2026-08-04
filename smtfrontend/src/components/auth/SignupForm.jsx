import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";

import { register } from "../../services/authService";

const SignupForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [target.name]: "",
    }));
  };

 const validate = () => {
  const err = {};

  if (!formData.fullName.trim()) {
    err.fullName = "Full name is required";
  }

  if (!formData.email.trim()) {
    err.email = "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  ) {
    err.email = "Enter valid email";
  }

  if (!formData.phone.trim()) {
    err.phone = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    err.phone = "Enter valid phone number";
  }

  if (!formData.password) {
    err.password = "Password is required";
  } else if (formData.password.length < 6) {
    err.password = "Minimum 6 characters";
  }

  if (!formData.confirmPassword) {
    err.confirmPassword = "Confirm Password is required";
  } else if (formData.confirmPassword !== formData.password) {
    err.confirmPassword = "Passwords do not match";
  }

  setErrors(err);

  return Object.keys(err).length === 0;
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    setLoading(true);

    const response = await register({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    console.log(response.data);

    toast.success("Account Created Successfully");

    navigate("/login", {
      replace: true,
    });

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Registration Failed"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6">

      <motion.div
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: .6 }}
        className="w-full max-w-xl"
      >

        <Card className="bg-white/90 backdrop-blur-xl border border-orange-100 shadow-2xl">

          <AuthHeader
            title="Create Account 🚀"
            subtitle="Create your Skill Manthan Admin account"
          />

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <Input
              label="Full Name"
              name="fullName"
              placeholder="Enter Full Name"
              icon={User}
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />

            

            <Input
              label="Email"
              name="email"
              placeholder="Enter Email"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Phone Number"
               name="phone"
             placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <PasswordInput
              label="Password"
              name="password"
              placeholder="Create Password"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              icon={Lock}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <Button
  loading={loading}
  type="submit"
>
  {loading ? "Creating Account..." : "Create Account"}
</Button>

          </form>

          <AuthFooter
            text="Already have an account?"
            link="/login"
            linkText="Login"
          />

        </Card>

      </motion.div>

    </div>
  );
};

export default SignupForm;