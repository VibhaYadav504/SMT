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
  requireAdmin,
} from "../middlewares/admin.middleware.js";

const router = express.Router();

// ============================
// Public Banner Routes
// Students can view banners
// ============================

router.get("/", getAllBanners);

router.get("/:id", getBannerById);

// ============================
// Admin Only Routes
// ============================

router.post(
  "/",
  protect,
  requireAdmin,
  upload.single("image"),
  createBanner
);

router.put(
  "/:id",
  protect,
  requireAdmin,
  upload.single("image"),
  updateBanner
);

router.delete(
  "/:id",
  protect,
  requireAdmin,
  deleteBanner
);

export default router;