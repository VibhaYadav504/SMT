import { Router } from "express";

import authRoutes from "./auth.routes.js";
import studentRoutes from "./student.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Skill Manthan API Running 🚀",
  });
});

router.use("/auth", authRoutes);
router.use("/students", studentRoutes);

export default router;