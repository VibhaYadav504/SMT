import { Router } from "express";

import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
  updateProfileValidator,
  changePasswordValidator,
} from "../validators/auth.validator.js";

import { protectUser } from "../middlewares/auth.middleware.js";

const router = Router();

/* ===========================
   Public Routes
=========================== */

// Register
router.post(
  "/register",
  registerValidator,
  register
);

// Login
router.post(
  "/login",
  loginValidator,
  login
);

// Forgot Password
router.post(
  "/forgot-password",
  forgotPassword
);

// Verify Reset OTP
router.post(
  "/verify-reset-otp",
  verifyResetOtp
);

// Reset Password
router.post(
  "/reset-password",
  resetPassword
);

/* ===========================
   Protected Routes
=========================== */

// Logout
router.post(
  "/logout",
  protectUser,
  logout
);

// Get Profile
router.get(
  "/profile",
  protectUser,
  getProfile
);

// Update Profile
router.put(
  "/profile",
  protectUser,
  updateProfileValidator,
  updateProfile
);

// Change Password
router.put(
  "/change-password",
  protectUser,
  changePasswordValidator,
  changePassword
);

export default router;