import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
  addFeedback,
  fetchFeedbacks,
  fetchFeedback,
  editFeedback,
  removeFeedback,
} from "../controllers/feedback.controller.js";

const router = express.Router();

// Add Feedback
router.post(
  "/",
  upload.single("thumbnail"),
  addFeedback
);

// Get All Feedbacks
router.get("/", fetchFeedbacks);

// Get Feedback By ID
router.get("/:id", fetchFeedback);

// Update Feedback
router.put(
  "/:id",
  upload.single("thumbnail"),
  editFeedback
);

// Delete Feedback
router.delete("/:id", removeFeedback);

export default router;