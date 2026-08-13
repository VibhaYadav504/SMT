import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  addPlacement,
  fetchPlacements,
  fetchPlacement,
  editPlacement,
  removePlacement,
} from "../controllers/placement.controller.js";

import { protectSuperAdmin } from "../middlewares/superAdmin.middleware.js";

const router = express.Router();

// ============================================
// Placement Routes - Super Admin Only
// ============================================

// Add Placement
router.post(
  "/",
  protectSuperAdmin,
  upload.single("image"),
  addPlacement
);

// Get All Placements
router.get(
  "/",
  protectSuperAdmin,
  fetchPlacements
);

// Get Placement By ID
router.get(
  "/:id",
  protectSuperAdmin,
  fetchPlacement
);

// Update Placement
router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("image"),
  editPlacement
);

// Delete Placement
router.delete(
  "/:id",
  protectSuperAdmin,
  removePlacement
);

export default router;