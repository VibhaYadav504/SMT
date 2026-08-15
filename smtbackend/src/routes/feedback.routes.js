import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  addFeedback,
  fetchFeedbacks,
  fetchFeedback,
  editFeedback,
  removeFeedback,
} from "../controllers/feedback.controller.js";

import { protectSuperAdmin } from "../middlewares/superAdmin.middleware.js";

const router = express.Router();

// ============================================
// Feedback Routes
// ============================================

// Get All Feedbacks - Public
router.get(
  "/",
  fetchFeedbacks
);

// Get Feedback By ID - Public
router.get(
  "/:id",
  fetchFeedback
);

// Add Feedback - Super Admin Only
router.post(
  "/",
  protectSuperAdmin,
  upload.single("thumbnail"),
  addFeedback
);

// Update Feedback - Super Admin Only
router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("thumbnail"),
  editFeedback
);

// Delete Feedback - Super Admin Only
router.delete(
  "/:id",
  protectSuperAdmin,
  removeFeedback
);

export default router;