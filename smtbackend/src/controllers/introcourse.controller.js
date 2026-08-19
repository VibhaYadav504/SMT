import {
  createIntroCourseService,
  getIntroCoursesService,
  getIntroCourseByIdService,
  updateIntroCourseService,
  deleteIntroCourseService,
} from "../services/introcourse.service.js";

import { uploadImage } from "../config/cloudinary.js";

// ============================================
// CREATE INTRO COURSE
// ============================================

export const createIntroCourse = async (
  req,
  res
) => {
  try {
    console.log(
      "Uploaded file:",
      req.file
    );

    console.log(
      "IntroCourse Body:",
      req.body
    );

    let thumbnail = "";

    // ============================================
    // UPLOAD THUMBNAIL
    // ============================================

    if (req.file) {
      const uploadedImage =
        await uploadImage(
          req.file,
          "SkillManthan/IntroCourse"
        );

      thumbnail =
        uploadedImage.secure_url;
    }

    // ============================================
    // CREATE
    // ============================================

    const introCourse =
      await createIntroCourseService({
        ...req.body,
        thumbnail,
      });

    return res.status(201).json({
      success: true,
      message:
        "IntroCourse created successfully",
      data: introCourse,
    });
  } catch (error) {
    console.error(
      "Create IntroCourse Error:",
      error
    );

    return res.status(
      error.statusCode || 400
    ).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// GET ALL
// ============================================

export const getIntroCourses = async (
  req,
  res
) => {
  try {
    const introCourses =
      await getIntroCoursesService();

    return res.status(200).json({
      success: true,
      count: introCourses.length,
      data: introCourses,
    });
  } catch (error) {
    console.error(
      "Get IntroCourses Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch intro courses",
    });
  }
};

// ============================================
// GET BY ID
// ============================================

export const getIntroCourseById = async (
  req,
  res
) => {
  try {
    const introCourse =
      await getIntroCourseByIdService(
        req.params.id
      );

    if (!introCourse) {
      return res.status(404).json({
        success: false,
        message:
          "IntroCourse not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: introCourse,
    });
  } catch (error) {
    console.error(
      "Get IntroCourse By ID Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch intro course",
    });
  }
};

// ============================================
// UPDATE
// ============================================

export const updateIntroCourse = async (
  req,
  res
) => {
  try {
    const data = {
      ...req.body,
    };

    console.log(
      "Update IntroCourse Body:",
      req.body
    );

    console.log(
      "Updated File:",
      req.file
    );

    // ============================================
    // UPLOAD NEW THUMBNAIL
    // ============================================

    if (req.file) {
      const uploadedImage =
        await uploadImage(
          req.file,
          "SkillManthan/IntroCourse"
        );

      data.thumbnail =
        uploadedImage.secure_url;
    }

    // ============================================
    // UPDATE
    // ============================================

    const introCourse =
      await updateIntroCourseService(
        req.params.id,
        data
      );

    return res.status(200).json({
      success: true,
      message:
        "IntroCourse updated successfully",
      data: introCourse,
    });
  } catch (error) {
    console.error(
      "Update IntroCourse Error:",
      error
    );

    const statusCode =
      error.message ===
      "IntroCourse not found"
        ? 404
        : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// DELETE
// ============================================

export const deleteIntroCourse = async (
  req,
  res
) => {
  try {
    await deleteIntroCourseService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "IntroCourse deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete IntroCourse Error:",
      error
    );

    const statusCode =
      error.message ===
      "IntroCourse not found"
        ? 404
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};