import { Router } from "express";

import authRoutes from "./auth.routes.js";
import studentRoutes from "./student.routes.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = Router();

// API Health Check
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Skill Manthan API Running 🚀",
  });
});


router.use("/auth", authRoutes);

// ============================================
// Protected Student Routes - Admin Only
// ============================================
router.use(
  "/students",
  protect,
  authorize("Admin"),
  studentRoutes
);

export default router;