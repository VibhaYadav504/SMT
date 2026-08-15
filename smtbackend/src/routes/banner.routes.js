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
// Public Banner Routes
// Students can view banners
// ============================

// Get All Banners
router.get("/", getAllBanners);

// Get Banner By ID
router.get("/:id", getBannerById);


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