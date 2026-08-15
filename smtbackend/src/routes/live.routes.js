import express from "express";

import {
  createLive,
  getLives,
  getLiveById,
  updateLive,
  deleteLive,
} from "../controllers/live.controller.js";

import { protectSuperAdmin } from "../middlewares/superAdmin.middleware.js";

import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// ============================================
// PUBLIC
// ============================================

router.get("/", getLives);

router.get("/:id", getLiveById);

// ============================================
// SUPER ADMIN PROTECTED
// ============================================

router.post(
  "/",
  protectSuperAdmin,
  upload.single("video"),
  createLive
);

router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("video"),
  updateLive
);

router.delete(
  "/:id",
  protectSuperAdmin,
  deleteLive
);

export default router;