import {
  createTechnology,
  getAllTechnologies,
  getTechnologyById,
  updateTechnology,
  deleteTechnology,
} from "../services/technology.service.js";

import { validateTechnology } from "../validators/technology.validator.js";

import {
  uploadImage,
  uploadPdf,
} from "../config/cloudinary.js";


export const addTechnology = async (req, res) => {
  try {
    const { title } = req.body;

    // Validate body
    const { isValid, errors } = validateTechnology(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    // Get image and PDF
    const imageFile = req.files?.image?.[0];
    const pdfFile = req.files?.pdf?.[0];

    // Image validation
    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // PDF validation
    if (!pdfFile) {
      return res.status(400).json({
        success: false,
        message: "PDF is required",
      });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadImage(
      imageFile,
      "Technologies"
    );

    // Upload PDF to Cloudinary
    const uploadedPdf = await uploadPdf(
      pdfFile,
      "Technologies/PDFs"
    );

    // Save technology
    const technology = await createTechnology({
      title: title.trim(),
      image: uploadedImage.secure_url,
      pdf: uploadedPdf.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Technology added successfully",
      data: technology,
    });
  } catch (error) {
    console.error("Add Technology Error:", error);

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
    console.error("Fetch Technologies Error:", error);

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
    console.error("Fetch Technology Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const editTechnology = async (req, res) => {
  try {
    const updateData = {};

    // Update title
    if (req.body?.title !== undefined) {
      updateData.title = req.body.title.trim();
    }

    // Get uploaded files
    const imageFile = req.files?.image?.[0];
    const pdfFile = req.files?.pdf?.[0];

    // Update image if provided
    if (imageFile) {
      const uploadedImage = await uploadImage(
        imageFile,
        "Technologies"
      );

      updateData.image = uploadedImage.secure_url;
    }

    // Update PDF if provided
    if (pdfFile) {
      const uploadedPdf = await uploadPdf(
        pdfFile,
        "Technologies/PDFs"
      );

      updateData.pdf = uploadedPdf.secure_url;
    }

    // Update database
    const technology = await updateTechnology(
      req.params.id,
      updateData
    );

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
    console.error("Update Technology Error:", error);

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
    console.error("Delete Technology Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};