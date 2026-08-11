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
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ============================================
// Protected Course Routes - Admin Only
// ============================================

// Add Course
router.post(
  "/",
  protect,
  authorize("Admin"),
  upload.single("image"),
  addCourse
);

// Get All Courses
router.get(
  "/",
  protect,
  authorize("Admin"),
  fetchCourses
);

// Get Course By ID
router.get(
  "/:id",
  protect,
  authorize("Admin"),
  fetchCourse
);

// Update Course
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.single("image"),
  editCourse
);

// Delete Course
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  removeCourse
);

export default router;