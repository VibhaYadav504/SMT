import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
  addFeedback,
  fetchFeedbacks,
  fetchFeedback,
  editFeedback,
  removeFeedback,
} from "../controllers/feedback.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ============================================
// All Feedback Routes Protected
// ============================================

// Get All Feedbacks
router.get(
  "/",
  protect,
  authorize("Admin"),
  fetchFeedbacks
);

// Get Feedback By ID
router.get(
  "/:id",
  protect,
  authorize("Admin"),
  fetchFeedback
);

// Add Feedback
router.post(
  "/",
  protect,
  authorize("Admin"),
  upload.single("thumbnail"),
  addFeedback
);

// Update Feedback
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.single("thumbnail"),
  editFeedback
);

// Delete Feedback
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  removeFeedback
);

export default router;