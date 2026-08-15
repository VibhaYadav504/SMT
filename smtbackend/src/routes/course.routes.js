import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  addCourse,
  fetchCourses,
  fetchCourse,
  editCourse,
  removeCourse,
} from "../controllers/course.controller.js";

import { protectSuperAdmin } from "../middlewares/superAdmin.middleware.js";

const router = express.Router();

// ============================================
// Course Routes
// ============================================

// Add Course - Super Admin Only
router.post(
  "/",
  protectSuperAdmin,
  upload.single("image"),
  addCourse
);

// Get All Courses - Public
router.get(
  "/",
  fetchCourses
);

// Get Course By ID - Public
router.get(
  "/:id",
  fetchCourse
);

// Update Course - Super Admin Only
router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("image"),
  editCourse
);

// Delete Course - Super Admin Only
router.delete(
  "/:id",
  protectSuperAdmin,
  removeCourse
);

export default router;