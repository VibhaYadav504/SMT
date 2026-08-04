import { Router } from "express";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  changeStudentStatus,
} from "../controllers/student.controller.js";

import {
  createStudentValidator,
  updateStudentValidator,
  studentIdValidator,
  studentListValidator,
  changeStatusValidator,
} from "../validators/student.validator.js";

const router = Router();

/**
 * Student CRUD
 */

// GET All Students
// POST Create Student
router
  .route("/")
  .get(studentListValidator, getAllStudents)
  .post(createStudentValidator, createStudent);

// GET Student By ID
// PUT Update Student
// DELETE Student
router
  .route("/:id")
  .get(studentIdValidator, getStudentById)
  .put(updateStudentValidator, updateStudent)
  .delete(studentIdValidator, deleteStudent);

// Change Student Status
router.patch(
  "/:id/status",
  changeStatusValidator,
  changeStudentStatus
);

export default router;