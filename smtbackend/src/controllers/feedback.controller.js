import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} from "../services/feedback.service.js";

import { uploadImage } from "../config/cloudinary.js";

/**
 * Add Feedback
 */
export const addFeedback = async (req, res) => {
  try {
    const { videoUrl, description } = req.body || {};

    // Video URL validation
    if (!videoUrl || !videoUrl.trim()) {
      return res.status(400).json({
        success: false,
        message: "Video URL is required",
      });
    }

    // Description validation
    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    // Thumbnail validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail is required",
      });
    }

    // Upload thumbnail to Cloudinary
    const uploadedThumbnail = await uploadImage(
      req.file,
      "Feedback/Thumbnails"
    );

    // Save feedback
    const feedback = await createFeedback({
      videoUrl: videoUrl.trim(),
      description: description.trim(),
      thumbnail: uploadedThumbnail.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Feedback added successfully",
      data: feedback,
    });
  } catch (error) {
    console.error("Add Feedback Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Feedbacks
 */
export const fetchFeedbacks = async (req, res) => {
  try {
    const feedbacks = await getAllFeedbacks();

    return res.status(200).json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    console.error("Fetch Feedbacks Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Feedback By ID
 */
export const fetchFeedback = async (req, res) => {
  try {
    const feedback = await getFeedbackById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.error("Fetch Feedback Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Feedback
 */
export const editFeedback = async (req, res) => {
  try {
    const updateData = {};

    // Update video URL
    if (req.body?.videoUrl !== undefined) {
      updateData.videoUrl = req.body.videoUrl.trim();
    }

    // Update description
    if (req.body?.description !== undefined) {
      updateData.description = req.body.description.trim();
    }

    // Update thumbnail
    if (req.file) {
      const uploadedThumbnail = await uploadImage(
        req.file,
        "Feedback/Thumbnails"
      );

      updateData.thumbnail = uploadedThumbnail.secure_url;
    }

    const feedback = await updateFeedback(
      req.params.id,
      updateData
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Feedback updated successfully",
      data: feedback,
    });
  } catch (error) {
    console.error("Update Feedback Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Feedback
 */
export const removeFeedback = async (req, res) => {
  try {
    const feedback = await deleteFeedback(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("Delete Feedback Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};