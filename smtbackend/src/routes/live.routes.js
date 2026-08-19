import express from "express";

import {
  createLive,
  getLives,
  getLiveById,
  updateLive,
  deleteLive,
} from "../controllers/live.controller.js";

import { protectSuperAdmin } from "../middlewares/superAdmin.middleware.js";

import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// ============================================
// PUBLIC
// ============================================

// Get All Lives
router.get("/", getLives);

// Get Live By ID
router.get("/:id", getLiveById);

// ============================================
// SUPER ADMIN PROTECTED
// ============================================

// Create Live
router.post(
  "/",
  protectSuperAdmin,
  upload.single("thumbnail"),
  createLive
);

// Update Live
router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("thumbnail"),
  updateLive
);

// Delete Live
router.delete(
  "/:id",
  protectSuperAdmin,
  deleteLive
);

export default router;