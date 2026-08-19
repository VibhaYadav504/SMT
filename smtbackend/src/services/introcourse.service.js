import IntroCourse from "../models/introcourse.model.js";

// ============================================
// CREATE INTRO COURSE
// ============================================

export const createIntroCourseService = async (data) => {
  const {
    title,
    thumbnail,
    description,
    rating,
    student,
    videos,
    aboutCourse,
    courseCurriculum,
  } = data;

  // ============================================
  // REQUIRED FIELD VALIDATION
  // ============================================

  if (!title?.trim()) {
    throw new Error("Title is required");
  }

  if (!thumbnail?.trim()) {
    throw new Error("Thumbnail is required");
  }

  if (!description?.trim()) {
    throw new Error("Description is required");
  }

  if (!aboutCourse?.trim()) {
    throw new Error("About course is required");
  }

  if (!courseCurriculum?.trim()) {
    throw new Error("Course curriculum is required");
  }

  // ============================================
  // RATING VALIDATION
  // ============================================

  const parsedRating =
    rating !== undefined && rating !== ""
      ? Number(rating)
      : 0;

  if (
    Number.isNaN(parsedRating) ||
    parsedRating < 0 ||
    parsedRating > 5
  ) {
    throw new Error(
      "Rating must be between 0 and 5"
    );
  }

  // ============================================
  // STUDENT VALIDATION
  // ============================================

  const parsedStudent =
    student !== undefined && student !== ""
      ? Number(student)
      : 0;

  if (
    Number.isNaN(parsedStudent) ||
    parsedStudent < 0
  ) {
    throw new Error("Invalid student count");
  }

  // ============================================
  // VIDEOS VALIDATION
  // ============================================

  const parsedVideos =
    videos !== undefined && videos !== ""
      ? Number(videos)
      : 0;

  if (
    Number.isNaN(parsedVideos) ||
    parsedVideos < 0
  ) {
    throw new Error("Invalid video count");
  }

  // ============================================
  // CREATE INTRO COURSE
  // ============================================

  const introCourse = await IntroCourse.create({
    title: title.trim(),
    thumbnail: thumbnail.trim(),
    description: description.trim(),

    rating: parsedRating,

    student: parsedStudent,

    videos: parsedVideos,

    aboutCourse: aboutCourse.trim(),

    courseCurriculum: courseCurriculum.trim(),
  });

  return introCourse;
};

// ============================================
// GET ALL INTRO COURSES
// ============================================

export const getIntroCoursesService = async () => {
  const introCourses = await IntroCourse.find()
    .sort({ createdAt: -1 });

  return introCourses;
};

// ============================================
// GET INTRO COURSE BY ID
// ============================================

export const getIntroCourseByIdService = async (id) => {
  const introCourse = await IntroCourse.findById(id);

  return introCourse;
};

// ============================================
// UPDATE INTRO COURSE
// ============================================

export const updateIntroCourseService = async (
  id,
  data
) => {
  const introCourse = await IntroCourse.findById(id);

  if (!introCourse) {
    throw new Error("IntroCourse not found");
  }

  const {
    title,
    thumbnail,
    description,
    rating,
    student,
    videos,
    aboutCourse,
    courseCurriculum,
  } = data;

  // ============================================
  // UPDATE TITLE
  // ============================================

  if (title !== undefined) {
    if (!title?.trim()) {
      throw new Error("Title cannot be empty");
    }

    introCourse.title = title.trim();
  }

  // ============================================
  // UPDATE THUMBNAIL
  // ============================================

  if (thumbnail !== undefined) {
    if (!thumbnail?.trim()) {
      throw new Error(
        "Thumbnail cannot be empty"
      );
    }

    introCourse.thumbnail = thumbnail.trim();
  }

  // ============================================
  // UPDATE DESCRIPTION
  // ============================================

  if (description !== undefined) {
    if (!description?.trim()) {
      throw new Error(
        "Description cannot be empty"
      );
    }

    introCourse.description =
      description.trim();
  }

  // ============================================
  // UPDATE RATING
  // ============================================

  if (rating !== undefined) {
    const parsedRating = Number(rating);

    if (
      Number.isNaN(parsedRating) ||
      parsedRating < 0 ||
      parsedRating > 5
    ) {
      throw new Error(
        "Rating must be between 0 and 5"
      );
    }

    introCourse.rating = parsedRating;
  }

  // ============================================
  // UPDATE STUDENT
  // ============================================

  if (student !== undefined) {
    const parsedStudent = Number(student);

    if (
      Number.isNaN(parsedStudent) ||
      parsedStudent < 0
    ) {
      throw new Error(
        "Invalid student count"
      );
    }

    introCourse.student = parsedStudent;
  }

  // ============================================
  // UPDATE VIDEOS
  // ============================================

  if (videos !== undefined) {
    const parsedVideos = Number(videos);

    if (
      Number.isNaN(parsedVideos) ||
      parsedVideos < 0
    ) {
      throw new Error(
        "Invalid video count"
      );
    }

    introCourse.videos = parsedVideos;
  }

  // ============================================
  // UPDATE ABOUT COURSE
  // ============================================

  if (aboutCourse !== undefined) {
    if (!aboutCourse?.trim()) {
      throw new Error(
        "About course cannot be empty"
      );
    }

    introCourse.aboutCourse =
      aboutCourse.trim();
  }

  // ============================================
  // UPDATE COURSE CURRICULUM
  // ============================================

  if (courseCurriculum !== undefined) {
    if (!courseCurriculum?.trim()) {
      throw new Error(
        "Course curriculum cannot be empty"
      );
    }

    introCourse.courseCurriculum =
      courseCurriculum.trim();
  }

  // ============================================
  // SAVE
  // ============================================

  await introCourse.save();

  return introCourse;
};

// ============================================
// DELETE INTRO COURSE
// ============================================

export const deleteIntroCourseService = async (id) => {
  const introCourse = await IntroCourse.findById(id);

  if (!introCourse) {
    throw new Error("IntroCourse not found");
  }

  await IntroCourse.findByIdAndDelete(id);

  return true;
};