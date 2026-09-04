import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  addCourse,
  fetchCourses,
  fetchCourse,
  editCourse,
  removeCourse,
} from "../controllers/course.controller.js";

import {
  protect,
  requireAdmin,
} from "../middlewares/admin.middleware.js";

const router = express.Router();

// ============================================
// Course Routes
// ============================================

// Add Course - Admin Only
router.post(
  "/",
  protect,
  requireAdmin,
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

// Update Course - Admin Only
router.put(
  "/:id",
  protect,
  requireAdmin,
  upload.single("image"),
  editCourse
);

// Delete Course - Admin Only
router.delete(
  "/:id",
  protect,
  requireAdmin,
  removeCourse
);

export default router;