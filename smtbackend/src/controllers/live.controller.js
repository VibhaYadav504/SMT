import {
  createLiveService,
  getLivesService,
  getLiveByIdService,
  updateLiveService,
  deleteLiveService,
} from "../services/live.service.js";

// ============================================
// CREATE
// ============================================

export const createLive = async (req, res) => {
  try {
    const live = await createLiveService(req.body);

    return res.status(201).json({
      success: true,
      message: "Live created successfully",
      data: live,
    });
  } catch (error) {
    console.error("Create Live Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// GET ALL
// ============================================

export const getLives = async (req, res) => {
  try {
    const lives = await getLivesService();

    return res.status(200).json({
      success: true,
      count: lives.length,
      data: lives,
    });
  } catch (error) {
    console.error("Get Lives Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lives",
    });
  }
};

// ============================================
// GET BY ID
// ============================================

export const getLiveById = async (req, res) => {
  try {
    const live = await getLiveByIdService(req.params.id);

    if (!live) {
      return res.status(404).json({
        success: false,
        message: "Live not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: live,
    });
  } catch (error) {
    console.error("Get Live By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch live",
    });
  }
};

// ============================================
// UPDATE
// ============================================

export const updateLive = async (req, res) => {
  try {
    const live = await updateLiveService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Live updated successfully",
      data: live,
    });
  } catch (error) {
    console.error("Update Live Error:", error);

    const statusCode =
      error.message === "Live not found"
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

export const deleteLive = async (req, res) => {
  try {
    await deleteLiveService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Live deleted successfully",
    });
  } catch (error) {
    console.error("Delete Live Error:", error);

    const statusCode =
      error.message === "Live not found"
        ? 404
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};