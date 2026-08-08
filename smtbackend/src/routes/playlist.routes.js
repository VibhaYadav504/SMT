import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
  addPlaylist,
  fetchPlaylists,
  fetchPlaylist,
  editPlaylist,
  removePlaylist,
} from "../controllers/playlist.controller.js";

const router = express.Router();

router.post(
  "/",
  upload.single("video"),
  addPlaylist
);

router.get(
  "/",
  fetchPlaylists
);

router.get(
  "/:id",
  fetchPlaylist
);

router.put(
  "/:id",
  upload.single("video"),
  editPlaylist
);

router.delete(
  "/:id",
  removePlaylist
);

export default router;