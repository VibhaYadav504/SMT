import mongoose from "mongoose";

const introCourseSchema = new mongoose.Schema(
  {
    // ============================================
    // TITLE
    // ============================================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================
    // THUMBNAIL
    // ============================================

    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================
    // DESCRIPTION
    // ============================================

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================
    // RATING
    // ============================================

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // ============================================
    // STUDENT COUNT
    // ============================================

    student: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ============================================
    // VIDEO COUNT
    // ============================================

    videos: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ============================================
    // ABOUT COURSE
    // ============================================

    aboutCourse: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================
    // COURSE CURRICULUM
    // ============================================

    courseCurriculum: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const IntroCourse = mongoose.model(
  "IntroCourse",
  introCourseSchema
);

export default IntroCourse;