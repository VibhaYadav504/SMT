import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  addPlaylist,
  fetchPlaylists,
  fetchPlaylist,
  editPlaylist,
  removePlaylist,
} from "../controllers/playlist.controller.js";

import { protect } from "../middlewares/admin.middleware.js";

const router = express.Router();

// ============================================
// Playlist Routes
// ============================================

// Add Playlist - Admin Only
router.post(
  "/",
  protect,
  upload.single("thumbnail"),
  addPlaylist
);

// Get All Playlists - Public
router.get(
  "/",
  fetchPlaylists
);

// Get Playlist By ID - Public
router.get(
  "/:id",
  fetchPlaylist
);

// Update Playlist - Admin Only
router.put(
  "/:id",
  protect,
  upload.single("thumbnail"),
  editPlaylist
);

// Delete Playlist - Admin Only
router.delete(
  "/:id",
  protect,
  removePlaylist
);

export default router;