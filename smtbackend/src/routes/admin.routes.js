import { Router } from "express";

import { loginAdmin } from "../controllers/admin.controller.js";

import { adminLoginValidator } from "../validators/admin.validator.js";

const router = Router();

// ============================================
// ADMIN LOGIN
// ============================================

router.post(
  "/login",
  adminLoginValidator,
  loginAdmin
);

export default router;