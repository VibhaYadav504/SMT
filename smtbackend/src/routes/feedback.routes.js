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
// All Feedback Routes - Super Admin Only
// ============================================

// Get All Feedbacks
router.get(
  "/",
  protectSuperAdmin,
  fetchFeedbacks
);

// Get Feedback By ID
router.get(
  "/:id",
  protectSuperAdmin,
  fetchFeedback
);

// Add Feedback
router.post(
  "/",
  protectSuperAdmin,
  upload.single("thumbnail"),
  addFeedback
);

// Update Feedback
router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("thumbnail"),
  editFeedback
);

// Delete Feedback
router.delete(
  "/:id",
  protectSuperAdmin,
  removeFeedback
);

export default router;