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
// Protected Student Routes - Super Admin Only
// ============================================

// Create Student
router.post(
  "/",
  protectSuperAdmin,
  createStudent
);

// Get All Students
router.get(
  "/",
  protectSuperAdmin,
  getAllStudents
);

// Get Student By ID
router.get(
  "/:id",
  protectSuperAdmin,
  getStudentById
);

// Update Student
router.put(
  "/:id",
  protectSuperAdmin,
  updateStudent
);

// Delete Student
router.delete(
  "/:id",
  protectSuperAdmin,
  deleteStudent
);

// Change Student Status
router.patch(
  "/:id/status",
  protectSuperAdmin,
  changeStudentStatus
);

export default router;