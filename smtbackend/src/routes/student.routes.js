import express from "express";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  changeStudentStatus,
} from "../controllers/student.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ============================================
// Protected Student Routes - Admin Only
// ============================================

// Create Student
router.post(
  "/",
  protect,
  authorize("Admin"),
  createStudent
);

// Get All Students
router.get(
  "/",
  protect,
  authorize("Admin"),
  getAllStudents
);

// Get Student By ID
router.get(
  "/:id",
  protect,
  authorize("Admin"),
  getStudentById
);

// Update Student
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  updateStudent
);

// Delete Student
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteStudent
);

// Change Student Status
router.patch(
  "/:id/status",
  protect,
  authorize("Admin"),
  changeStudentStatus
);

export default router;