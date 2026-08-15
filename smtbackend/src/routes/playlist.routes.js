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
// Playlist Routes
// ============================================

// Add Playlist - Super Admin Only
router.post(
  "/",
  protectSuperAdmin,
  upload.single("thumbnail"),
  addPlaylist
);

// Get All Playlists - Public (No Token Required)
router.get(
  "/",
  fetchPlaylists
);

// Get Playlist By ID - Public (No Token Required)
router.get(
  "/:id",
  fetchPlaylist
);

// Update Playlist - Super Admin Only
router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("thumbnail"),
  editPlaylist
);

// Delete Playlist - Super Admin Only
router.delete(
  "/:id",
  protectSuperAdmin,
  removePlaylist
);

export default router;