import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
  addPlaylist,
  fetchPlaylists,
  fetchPlaylist,
  editPlaylist,
  removePlaylist,
} from "../controllers/playlist.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add Playlist
router.post(
  "/",
  protect,
  authorize("Admin"),
  upload.single("thumbnail"),
  addPlaylist
);

// Get All Playlists
router.get(
  "/",
  protect,
  authorize("Admin"),
  fetchPlaylists
);

// Get Playlist By ID
router.get(
  "/:id",
  protect,
  authorize("Admin"),
  fetchPlaylist
);

// Update Playlist
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.single("thumbnail"),
  editPlaylist
);

// Delete Playlist
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  removePlaylist
);

export default router;