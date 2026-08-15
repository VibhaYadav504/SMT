import express from "express";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  changeStudentStatus,
} from "../controllers/student.controller.js";

import { protectSuperAdmin } from "../middlewares/superAdmin.middleware.js";

const router = express.Router();

// ============================================
// Student Routes
// ============================================

// Create Student - Super Admin Only
router.post(
  "/",
  protectSuperAdmin,
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

// Update Student - Super Admin Only
router.put(
  "/:id",
  protectSuperAdmin,
  updateStudent
);

// Delete Student - Super Admin Only
router.delete(
  "/:id",
  protectSuperAdmin,
  deleteStudent
);

// Change Student Status - Super Admin Only
router.patch(
  "/:id/status",
  protectSuperAdmin,
  changeStudentStatus
);

export default router;