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
// Protected Course Routes - Super Admin Only
// ============================================

// Add Course
router.post(
  "/",
  protectSuperAdmin,
  upload.single("image"),
  addCourse
);

// Get All Courses
router.get(
  "/",
  protectSuperAdmin,
  fetchCourses
);

// Get Course By ID
router.get(
  "/:id",
  protectSuperAdmin,
  fetchCourse
);

// Update Course
router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("image"),
  editCourse
);

// Delete Course
router.delete(
  "/:id",
  protectSuperAdmin,
  removeCourse
);

export default router;