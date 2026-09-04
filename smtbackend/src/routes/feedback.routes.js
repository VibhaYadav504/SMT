import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  addFeedback,
  fetchFeedbacks,
  fetchFeedback,
  editFeedback,
  removeFeedback,
} from "../controllers/feedback.controller.js";

import { protect } from "../middlewares/admin.middleware.js";
import {
  protectUser,
  authorize,
} from "../middlewares/auth.middleware.js";

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

// Add Feedback - Student Only
router.post(
  "/",
  protectUser,
  authorize("Student"),
  upload.single("thumbnail"),
  addFeedback
);

// Update Feedback - Admin Only
router.put(
  "/:id",
  protect,
  upload.single("thumbnail"),
  editFeedback
);

// Delete Feedback - Admin Only
router.delete(
  "/:id",
  protect,
  removeFeedback
);

export default router;