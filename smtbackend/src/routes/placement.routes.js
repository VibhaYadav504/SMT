import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
  addPlacement,
  fetchPlacements,
  fetchPlacement,
  editPlacement,
  removePlacement,
} from "../controllers/placement.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add Placement
router.post(
  "/",
  protect,
  authorize("Admin"),
  upload.single("image"),
  addPlacement
);

// Get All Placements
router.get(
  "/",
  protect,
  authorize("Admin"),
  fetchPlacements
);

// Get Placement By ID
router.get(
  "/:id",
  protect,
  authorize("Admin"),
  fetchPlacement
);

// Update Placement
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.single("image"),
  editPlacement
);

// Delete Placement
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  removePlacement
);

export default router;