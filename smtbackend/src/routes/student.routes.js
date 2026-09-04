import express from "express";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  changeStudentStatus,
} from "../controllers/student.controller.js";

import { protect } from "../middlewares/admin.middleware.js";

const router = express.Router();

// ============================================
// Student Routes
// ============================================

// Create Student - Admin Only
router.post(
  "/",
  protect,
  createStudent
);

// Get All Students - Public
router.get(
  "/",
  getAllStudents
);

// Get Student By ID - Public
router.get(
  "/:id",
  getStudentById
);

// Update Student - Admin Only
router.put(
  "/:id",
  protect,
  updateStudent
);

// Delete Student - Admin Only
router.delete(
  "/:id",
  protect,
  deleteStudent
);

// Change Student Status - Admin Only
router.patch(
  "/:id/status",
  protect,
  changeStudentStatus
);

export default router;