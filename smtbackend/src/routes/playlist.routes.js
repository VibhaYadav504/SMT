import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  addPlaylist,
  fetchPlaylists,
  fetchPlaylist,
  editPlaylist,
  removePlaylist,
} from "../controllers/playlist.controller.js";

import { protectSuperAdmin } from "../middlewares/superAdmin.middleware.js";

const router = express.Router();

// ============================================
// Playlist Routes - Super Admin Only
// ============================================

// Add Playlist
router.post(
  "/",
  protectSuperAdmin,
  upload.single("thumbnail"),
  addPlaylist
);

// Get All Playlists
router.get(
  "/",
  protectSuperAdmin,
  fetchPlaylists
);

// Get Playlist By ID
router.get(
  "/:id",
  protectSuperAdmin,
  fetchPlaylist
);

// Update Playlist
router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("thumbnail"),
  editPlaylist
);

// Delete Playlist
router.delete(
  "/:id",
  protectSuperAdmin,
  removePlaylist
);

export default router;