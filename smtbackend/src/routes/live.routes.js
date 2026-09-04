import express from "express";

import {
  createLive,
  getLives,
  getLiveById,
  updateLive,
  deleteLive,
} from "../controllers/live.controller.js";

import { protect } from "../middlewares/admin.middleware.js";

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
// ADMIN PROTECTED
// ============================================

// Create Live
router.post(
  "/",
  protect,
  upload.single("thumbnail"),
  createLive
);

// Update Live
router.put(
  "/:id",
  protect,
  upload.single("thumbnail"),
  updateLive
);

// Delete Live
router.delete(
  "/:id",
  protect,
  deleteLive
);

export default router;