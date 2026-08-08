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

router.post(
  "/",
  upload.single("thumbnail"),
  addFeedback
);

router.get("/", fetchFeedbacks);

router.get("/:id", fetchFeedback);

router.put(
  "/:id",
  upload.single("thumbnail"),
  editFeedback
);

router.delete("/:id", removeFeedback);

export default router;