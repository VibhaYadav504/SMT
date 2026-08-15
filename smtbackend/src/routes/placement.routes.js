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
// Placement Routes
// ============================================

// Add Placement - Super Admin Only
router.post(
  "/",
  protectSuperAdmin,
  upload.single("image"),
  addPlacement
);

// Get All Placements - Public
router.get(
  "/",
  fetchPlacements
);

// Get Placement By ID - Public
router.get(
  "/:id",
  fetchPlacement
);

// Update Placement - Super Admin Only
router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("image"),
  editPlacement
);

// Delete Placement - Super Admin Only
router.delete(
  "/:id",
  protectSuperAdmin,
  removePlacement
);

export default router;