import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
} from "../services/playlist.service.js";

import { validatePlaylist } from "../validators/playlist.validator.js";
import { uploadVideo } from "../config/cloudinary.js";

/**
 * Add Playlist
 */
export const addPlaylist = async (req, res) => {
  try {
    const {
      name,
      description,
      course,
    } = req.body;

    const { isValid, errors } = validatePlaylist(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video is required",
      });
    }

    const uploadedVideo = await uploadVideo(
      req.file,
      "SkillManthan/Playlists"
    );

    const playlist = await createPlaylist({
      name,
      description,
      video: uploadedVideo.secure_url,
      course: course || null,
    });

    return res.status(201).json({
      success: true,
      message: "Playlist added successfully",
      data: playlist,
    });
  } catch (error) {
    console.error("Add Playlist Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Playlists
 */
export const fetchPlaylists = async (req, res) => {
  try {
    const playlists = await getAllPlaylists();

    return res.status(200).json({
      success: true,
      data: playlists,
    });
  } catch (error) {
    console.error("Fetch Playlists Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Playlist By ID
 */
export const fetchPlaylist = async (req, res) => {
  try {
    const playlist = await getPlaylistById(req.params.id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: playlist,
    });
  } catch (error) {
    console.error("Fetch Playlist Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Playlist
 */
export const editPlaylist = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      course: req.body.course || null,
    };

    if (req.file) {
      const uploadedVideo = await uploadVideo(
        req.file,
        "SkillManthan/Playlists"
      );

      updateData.video = uploadedVideo.secure_url;
    }

    const playlist = await updatePlaylist(
      req.params.id,
      updateData
    );

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Playlist updated successfully",
      data: playlist,
    });
  } catch (error) {
    console.error("Update Playlist Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Playlist
 */
export const removePlaylist = async (req, res) => {
  try {
    const playlist = await deletePlaylist(req.params.id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
    });
  } catch (error) {
    console.error("Delete Playlist Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};