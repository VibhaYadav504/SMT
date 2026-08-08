import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} from "../services/feedback.service.js";

import { validateFeedback } from "../validators/feedback.validator.js";

/**
 * Add Feedback
 */
export const addFeedback = async (req, res) => {
  try {
    const {
      name,
      email,
      message,
      rating,
    } = req.body;

    const { isValid, errors } = validateFeedback(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const feedback = await createFeedback({
      name,
      email,
      message,
      rating: rating || 5,
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
    const updateData = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      rating: req.body.rating,
      status: req.body.status,
    };

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