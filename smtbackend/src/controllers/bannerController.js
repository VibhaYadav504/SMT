import { uploadImage } from "../config/cloudinary.js";
import * as bannerService from "../services/bannerService.js";

// Create Banner
export const createBanner = async (req, res) => {
  try {
    let imageUrl="";
    if(req.file){
      const uploaded = await uploadImage(
        req.file,
        "Banner"
      );
       imageUrl = uploaded.secure_url;
    }
    const banner = await bannerService.createBanner({
      name:req.body.name,
      image:imageUrl
    });

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Banners
export const getAllBanners = async (req, res) => {
  try {
    const banners = await bannerService.getAllBanners();

    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Banner By ID
export const getBannerById = async (req, res) => {
  try {
    const banner = await bannerService.getBannerById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Banner
export const updateBanner = async (req, res) => {
  try {
    const banner = await bannerService.updateBanner(req.params.id, req.body);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Banner
export const deleteBanner = async (req, res) => {
  try {
    const banner = await bannerService.deleteBanner(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};