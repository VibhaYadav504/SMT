import express from "express";

import {
  createIntroCourse,
  getIntroCourses,
  getIntroCourseById,
  updateIntroCourse,
  deleteIntroCourse,
} from "../controllers/introcourse.controller.js";

import { protect } from "../middlewares/admin.middleware.js";

import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// ============================================
// PUBLIC ROUTES
// ============================================

// Get All Intro Courses
router.get(
  "/",
  getIntroCourses
);

// Get Intro Course By ID
router.get(
  "/:id",
  getIntroCourseById
);

// ============================================
// ADMIN PROTECTED
// ============================================

// Create Intro Course
router.post(
  "/",
  protect,
  upload.single("thumbnail"),
  createIntroCourse
);

// Update Intro Course
router.put(
  "/:id",
  protect,
  upload.single("thumbnail"),
  updateIntroCourse
);

// Delete Intro Course
router.delete(
  "/:id",
  protect,
  deleteIntroCourse
);

export default router;