
import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  addPlacement,
  fetchPlacements,
  fetchPlacement,
  editPlacement,
  removePlacement,
} from "../controllers/placement.controller.js";

import { protect } from "../middlewares/admin.middleware.js";

const router = express.Router();

// ============================================
// Placement Routes
// ============================================

// ============================================
// Add Placement - Admin Only
// ============================================

router.post(
  "/",
  protect,
  upload.single("image"),
  addPlacement
);

// ============================================
// Get All Placements - Public
// ============================================

router.get(
  "/",
  fetchPlacements
);

// ============================================
// Get Placement By ID - Public
// ============================================

router.get(
  "/:id",
  fetchPlacement
);

// ============================================
// Update Placement - Admin Only
// ============================================

router.put(
  "/:id",
  protect,
  upload.single("image"),
  editPlacement
);

// ============================================
// Delete Placement - Admin Only
// ============================================

router.delete(
  "/:id",
  protect,
  removePlacement
);

export default router;

