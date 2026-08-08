import express from "express";

import {
  addFeedback,
  fetchFeedbacks,
  fetchFeedback,
  editFeedback,
  removeFeedback,
} from "../controllers/feedback.controller.js";

const router = express.Router();

router.post("/", addFeedback);

router.get("/", fetchFeedbacks);

router.get("/:id", fetchFeedback);

router.put("/:id", editFeedback);

router.delete("/:id", removeFeedback);

export default router;