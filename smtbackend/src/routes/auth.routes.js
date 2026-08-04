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

import { protect } from "../middlewares/auth.middleware.js";

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

//verifyResetOtp

router.post
("/verify-reset-otp", 
  verifyResetOtp);

//resetPassword

  router.post
  ("/reset-password", 
  resetPassword);

/* ===========================
   Protected Routes
=========================== */

// Logout
router.post(
  "/logout",
  protect,
  logout
);

// Get Profile
router.get(
  "/profile",
  protect,
  getProfile
);

// Update Profile
router.put(
  "/profile",
  protect,
  updateProfileValidator,
  updateProfile
);

// Change Password
router.put(
  "/change-password",
  protect,
  changePasswordValidator,
  changePassword
);

export default router;