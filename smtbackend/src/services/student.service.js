import Student from "../models/student.model.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create Student
 */
export const createStudentService = async (studentData) => {
  const { email, phone } = studentData;

  // Check Email
  const emailExists = await Student.findOne({ email });
  if (emailExists) {
    throw new ApiError(409, "Email already exists");
  }

  // Check Phone
  const phoneExists = await Student.findOne({ phone });
  if (phoneExists) {
    throw new ApiError(409, "Phone number already exists");
  }

  const student = await Student.create(studentData);

  return student;
};

/**
 * Get All Students
 */
export const getAllStudentsService = async (query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
    paymentStatus,
    sort = "-createdAt",
  } = query;

  const filter = {};

  // Search
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { studentId: { $regex: search, $options: "i" } },
    ];
  }

  // Status Filter
  if (status) {
    filter.status = status;
  }

  // Payment Filter
  if (paymentStatus) {
    filter.paymentStatus = paymentStatus;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const students = await Student.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Student.countDocuments(filter);

  return {
    students,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get Student By ID
 */
export const getStudentByIdService = async (id) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  return student;
};

/**
 * Update Student
 */
export const updateStudentService = async (id, data) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Email Duplicate Check
  if (data.email && data.email !== student.email) {
    const exists = await Student.findOne({ email: data.email });

    if (exists) {
      throw new ApiError(409, "Email already exists");
    }
  }

  // Phone Duplicate Check
  if (data.phone && data.phone !== student.phone) {
    const exists = await Student.findOne({ phone: data.phone });

    if (exists) {
      throw new ApiError(409, "Phone already exists");
    }
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedStudent;
};

/**
 * Delete Student
 */
export const deleteStudentService = async (id) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  await student.deleteOne();

  return true;
};

/**
 * Change Student Status
 */
export const changeStudentStatusService = async (
  id,
  status
) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  student.status = status;

  await student.save();

  return student;
};