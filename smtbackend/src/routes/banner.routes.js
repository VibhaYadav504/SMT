import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ============================================
// Protected Banner Routes - Admin Only
// ============================================

// Create Banner
router.post(
  "/",
  protect,
  authorize("Admin"),
  upload.single("image"),
  createBanner
);

// Get All Banners
router.get(
  "/",
  protect,
  authorize("Admin"),
  getAllBanners
);

// Get Banner By ID
router.get(
  "/:id",
  protect,
  authorize("Admin"),
  getBannerById
);

// Update Banner
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.single("image"),
  updateBanner
);

// Delete Banner
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteBanner
);

export default router;