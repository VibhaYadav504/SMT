import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
  changeStudentStatusService,
} from "../services/student.service.js";

/**
 * Create Student
 */
export const createStudent = asyncHandler(async (req, res) => {
  const student = await createStudentService(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Student created successfully",
      student
    )
  );
});

/**
 * Get All Students
 */
export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await getAllStudentsService(req.query);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Students fetched successfully",
      students
    )
  );
});

/**
 * Get Student By ID
 */
export const getStudentById = asyncHandler(async (req, res) => {
  const student = await getStudentByIdService(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Student fetched successfully",
      student
    )
  );
});

/**
 * Update Student
 */
export const updateStudent = asyncHandler(async (req, res) => {
  const student = await updateStudentService(
    req.params.id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Student updated successfully",
      student
    )
  );
});

/**
 * Delete Student
 */
export const deleteStudent = asyncHandler(async (req, res) => {
  await deleteStudentService(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Student deleted successfully",
      null
    )
  );
});

/**
 * Change Student Status
 */
export const changeStudentStatus = asyncHandler(async (req, res) => {
  const student = await changeStudentStatusService(
    req.params.id,
    req.body.status
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Student status updated successfully",
      student
    )
  );
});