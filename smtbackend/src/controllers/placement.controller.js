import {
  createPlacement,
  getAllPlacements,
  getPlacementById,
  updatePlacement,
  deletePlacement,
} from "../services/placement.service.js";

import { validatePlacement } from "../validators/placement.validator.js";

import { uploadImage } from "../config/cloudinary.js";

export const addPlacement = async (req, res) => {
  try {
    const {
      companyName,
      studentName,
      package: salaryPackage,
      designation,
      location,
      description,
    } = req.body;

    const { isValid, errors } = validatePlacement(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    // Check company logo
    if (!req.files?.companyLogo?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Company logo is required",
      });
    }

    // Upload company logo
    const uploadedCompanyLogo = await uploadImage(
      req.files.companyLogo[0],
      "Placements/Companies"
    );

    let studentImage = null;

    // Upload student image if provided
    if (req.files?.studentImage?.[0]) {
      const uploadedStudentImage = await uploadImage(
        req.files.studentImage[0],
        "Placements/Students"
      );

      studentImage = uploadedStudentImage.secure_url;
    }

    const placement = await createPlacement({
      companyName,
      companyLogo: uploadedCompanyLogo.secure_url,
      studentName,
      studentImage,
      package: salaryPackage,
      designation,
      location,
      description,
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
    const updateData = {
      companyName: req.body.companyName,
      studentName: req.body.studentName,
      package: req.body.package,
      designation: req.body.designation,
      location: req.body.location,
      description: req.body.description,
    };

    // New company logo
    if (req.files?.companyLogo?.[0]) {
      const uploadedCompanyLogo = await uploadImage(
        req.files.companyLogo[0],
        "Placements/Companies"
      );

      updateData.companyLogo =
        uploadedCompanyLogo.secure_url;
    }

    // New student image
    if (req.files?.studentImage?.[0]) {
      const uploadedStudentImage = await uploadImage(
        req.files.studentImage[0],
        "Placements/Students"
      );

      updateData.studentImage =
        uploadedStudentImage.secure_url;
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