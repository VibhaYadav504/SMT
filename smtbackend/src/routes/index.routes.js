import { Router } from "express";

import authRoutes from "./auth.routes.js";
import studentRoutes from "./student.routes.js";

import { protect } from "../middlewares/admin.middleware.js";

const router = Router();

// ============================================
// API HEALTH CHECK
// ============================================

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Skill Manthan API Running 🚀",
  });
});

// ============================================
// AUTH ROUTES
// ============================================

router.use("/auth", authRoutes);

// ============================================
// STUDENT MANAGEMENT ROUTES
// ADMIN ONLY
// ============================================

router.use(
  "/students",
  protect,
  studentRoutes
);

export default router;


