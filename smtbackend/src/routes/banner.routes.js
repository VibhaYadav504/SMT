import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

import { protectSuperAdmin } from "../middlewares/superAdmin.middleware.js";

const router = express.Router();


// ============================
// Super Admin Only
// ============================

// Create Banner
router.post(
  "/",
  protectSuperAdmin,
  upload.single("image"),
  createBanner
);

// Get All Banners
router.get(
  "/",
  protectSuperAdmin,
  getAllBanners
);

// Get Banner By ID
router.get(
  "/:id",
  protectSuperAdmin,
  getBannerById
);

// Update Banner
router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("image"),
  updateBanner
);

// Delete Banner
router.delete(
  "/:id",
  protectSuperAdmin,
  deleteBanner
);

export default router;