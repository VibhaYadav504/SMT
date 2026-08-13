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



// Get All Technologies
router.get(
  "/",
  protectSuperAdmin,
  fetchTechnologies
);

// Get Technology By ID
router.get(
  "/:id",
  protectSuperAdmin,
  fetchTechnology
);

// Add Technology
router.post(
  "/",
  protectSuperAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  addTechnology
);

// Update Technology
router.put(
  "/:id",
  protectSuperAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  editTechnology
);

// Delete Technology
router.delete(
  "/:id",
  protectSuperAdmin,
  removeTechnology
);

export default router;