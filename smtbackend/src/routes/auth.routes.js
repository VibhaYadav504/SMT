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

/* ==========================================
   TEST AUTH ROUTE
========================================== */

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth routes working",
  });
});

/* ==========================================
   PUBLIC ROUTES - STUDENT
========================================== */

// REGISTER
router.post(
  "/register",
  registerValidator,
  register
);

// LOGIN
router.post(
  "/login",
  loginValidator,
  login
);

// FORGOT PASSWORD
router.post(
  "/forgot-password",
  forgotPassword
);

// VERIFY RESET OTP
router.post(
  "/verify-reset-otp",
  verifyResetOtp
);

// RESET PASSWORD
router.post(
  "/reset-password",
  resetPassword
);

/* ==========================================
   PROTECTED ROUTES - STUDENT
========================================== */

// LOGOUT
router.post(
  "/logout",
  protectUser,
  logout
);

// GET PROFILE
router.get(
  "/profile",
  protectUser,
  getProfile
);

// UPDATE PROFILE
router.put(
  "/profile",
  protectUser,
  updateProfileValidator,
  updateProfile
);

// CHANGE PASSWORD
router.put(
  "/change-password",
  protectUser,
  changePasswordValidator,
  changePassword
);
router.post(
  "/register",
  (req, res, next) => {
    console.log("========== REGISTER BODY ==========");
    console.log(req.body);
    console.log("Content-Type:", req.headers["content-type"]);

    next();
  },
  registerValidator,
  register
);

export default router;