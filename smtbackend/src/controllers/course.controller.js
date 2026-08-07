import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../services/course.service.js";

import { validateCourse } from "../validators/course.validator.js";

import { uploadImage } from "../config/cloudinary.js";

export const addCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      video,
      duration,
    } = req.body;

    const { isValid, errors } = validateCourse(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Course image is required",
      });
    }

    // Upload course image to Cloudinary
    const uploadedImage = await uploadImage(
      req.file,
      "Courses"
    );

    const course = await createCourse({
      name,
      description,
      video: video || null,
      duration: duration || null,
      image: uploadedImage.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Course added successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchCourses = async (req, res) => {
  try {
    const courses = await getAllCourses();

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchCourse = async (req, res) => {
  try {
    const course = await getCourseById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      video: req.body.video || null,
      duration: req.body.duration || null,
    };

    // Upload new image if provided
    if (req.file) {
      const uploadedImage = await uploadImage(
        req.file,
        "Courses"
      );

      updateData.image = uploadedImage.secure_url;
    }

    const course = await updateCourse(
      req.params.id,
      updateData
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const course = await deleteCourse(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};