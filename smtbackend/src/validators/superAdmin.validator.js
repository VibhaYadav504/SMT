import { body } from "express-validator";
import { validate } from "./student.validator.js";

export const superAdminLoginValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  validate,
];