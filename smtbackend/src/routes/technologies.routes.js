import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  addTechnology,
  fetchTechnologies,
  fetchTechnology,
  editTechnology,
  removeTechnology,
} from "../controllers/technologies.controller.js";

import { protectSuperAdmin } from "../middlewares/superAdmin.middleware.js";

const router = express.Router();

// ============================================
// Technology Routes
// ============================================

// Get All Technologies - Public
router.get(
  "/",
  fetchTechnologies
);

// Get Technology By ID - Public
router.get(
  "/:id",
  fetchTechnology
);

// Add Technology - Super Admin Only
router.post(
  "/",
  protectSuperAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  addTechnology
);

// Update Technology - Super Admin Only
router.put(
  "/:id",
  protectSuperAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  editTechnology
);

// Delete Technology - Super Admin Only
router.delete(
  "/:id",
  protectSuperAdmin,
  removeTechnology
);

export default router;