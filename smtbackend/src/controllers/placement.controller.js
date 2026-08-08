import {
  createPlacement,
  getAllPlacements,
  getPlacementById,
  updatePlacement,
  deletePlacement,
} from "../services/placement.service.js";

import { uploadImage } from "../config/cloudinary.js";

export const addPlacement = async (req, res) => {
  try {
    const { name } = req.body;

    // Name validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // Image validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadImage(
      req.file,
      "Placements/Students"
    );

    // Create placement
    const placement = await createPlacement({
      name: name.trim(),
      image: uploadedImage.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Placement added successfully",
      data: placement,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchPlacements = async (req, res) => {
  try {
    const placements = await getAllPlacements();

    return res.status(200).json({
      success: true,
      data: placements,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchPlacement = async (req, res) => {
  try {
    const placement = await getPlacementById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: placement,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editPlacement = async (req, res) => {
  try {
    const updateData = {};

    // Update name
    if (req.body.name) {
      updateData.name = req.body.name.trim();
    }

    // Update image if new image is provided
    if (req.file) {
      const uploadedImage = await uploadImage(
        req.file,
        "Placements/Students"
      );

      updateData.image = uploadedImage.secure_url;
    }

    const placement = await updatePlacement(
      req.params.id,
      updateData
    );

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Placement updated successfully",
      data: placement,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removePlacement = async (req, res) => {
  try {
    const placement = await deletePlacement(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Placement deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};