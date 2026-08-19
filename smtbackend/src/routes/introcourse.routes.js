import express from "express";

import {
  createIntroCourse,
  getIntroCourses,
  getIntroCourseById,
  updateIntroCourse,
  deleteIntroCourse,
} from "../controllers/introcourse.controller.js";

import {
  protectSuperAdmin,
} from "../middlewares/superAdmin.middleware.js";

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
// SUPER ADMIN PROTECTED
// ============================================

// Create Intro Course
router.post(
  "/",
  protectSuperAdmin,
  upload.single("thumbnail"),
  createIntroCourse
);

// Update Intro Course
router.put(
  "/:id",
  protectSuperAdmin,
  upload.single("thumbnail"),
  updateIntroCourse
);

// Delete Intro Course
router.delete(
  "/:id",
  protectSuperAdmin,
  deleteIntroCourse
);

export default router;