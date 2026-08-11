import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
  addTechnology,
  fetchTechnologies,
  fetchTechnology,
  editTechnology,
  removeTechnology,
} from "../controllers/technologies.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ============================================
// Protected Technology Routes - Admin Only
// ============================================

// Get All Technologies
router.get(
  "/",
  protect,
  authorize("Admin"),
  fetchTechnologies
);

// Get Technology By ID
router.get(
  "/:id",
  protect,
  authorize("Admin"),
  fetchTechnology
);

// Add Technology
router.post(
  "/",
  protect,
  authorize("Admin"),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  addTechnology
);

// Update Technology
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  editTechnology
);

// Delete Technology
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  removeTechnology
);

export default router;