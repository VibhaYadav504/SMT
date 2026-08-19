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

// CREATE LIVE
router.post(
  "/",
  protectSuperAdmin,
  upload.single("thumbnail"),
  createLive
);

// UPDATE LIVE
router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("thumbnail"),
  updateLive
);

// DELETE LIVE
router.delete(
  "/:id",
  protectSuperAdmin,
  deleteLive
);

export default router;