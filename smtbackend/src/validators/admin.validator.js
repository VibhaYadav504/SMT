import { body } from "express-validator";
import { validate } from "./student.validator.js";

// ============================================
// ADMIN LOGIN VALIDATOR
// ============================================

export const adminLoginValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .trim(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  validate,
];