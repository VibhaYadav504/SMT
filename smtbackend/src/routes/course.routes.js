import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  addCourse,
  fetchCourses,
  fetchCourse,
  editCourse,
  removeCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  addCourse
);

router.get(
  "/",
  fetchCourses
);

router.get(
  "/:id",
  fetchCourse
);

router.put(
  "/:id",
  upload.single("image"),
  editCourse
);

router.delete(
  "/:id",
  removeCourse
);

export default router;