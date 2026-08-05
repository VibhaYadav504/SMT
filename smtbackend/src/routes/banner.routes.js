import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

const router = express.Router();

router.post("/", 
  upload.single("image"),createBanner);


router.get("/", getAllBanners);


router.get("/:id", getBannerById);


router.put("/:id", upload.single("image"),
 updateBanner);


router.delete("/:id", deleteBanner);

export default router;