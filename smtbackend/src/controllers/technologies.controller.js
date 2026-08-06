import {
  createTechnology,
  getAllTechnologies,
  getTechnologyById,
  updateTechnology,
  deleteTechnology,
} from "../services/technology.service.js";

import { validateTechnology } from "../validators/technology.validator.js";
import { uploadImage } from "../config/cloudinary.js";

export const addTechnology = async (req, res) => {
  try {
    const { title } = req.body;

    const { isValid, errors } = validateTechnology(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadImage(req.file, "Technologies");

    const technology = await createTechnology({
      title,
      image: uploadedImage.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Technology added successfully",
      data: technology,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchTechnologies = async (req, res) => {
  try {
    const technologies = await getAllTechnologies();

    return res.status(200).json({
      success: true,
      data: technologies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchTechnology = async (req, res) => {
  try {
    const technology = await getTechnologyById(req.params.id);

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: technology,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editTechnology = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
    };

    if (req.file) {
      const uploadedImage = await uploadImage(req.file, "Technologies");

      updateData.image = uploadedImage.secure_url;
    }

    const technology = await updateTechnology(req.params.id, updateData);

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Technology updated successfully",
      data: technology,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeTechnology = async (req, res) => {
  try {
    const technology = await deleteTechnology(req.params.id);

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Technology deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};