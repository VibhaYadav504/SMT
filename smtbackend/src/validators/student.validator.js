import { body, param, query, validationResult } from "express-validator";

/**
 * Common Validation Result Handler
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: errors.array(),
    });
  }

  next();
};

/**
 * Create Student Validation
 */
export const createStudentValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid mobile number"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),

  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Invalid date"),

  body("course")
    .trim()
    .notEmpty()
    .withMessage("Course is required"),

  body("fees")
    .notEmpty()
    .withMessage("Fees is required")
    .isNumeric()
    .withMessage("Fees must be numeric"),

  body("paymentStatus")
    .optional()
    .isIn(["Pending", "Partial", "Paid"])
    .withMessage("Invalid payment status"),

  body("status")
    .optional()
    .isIn(["Active", "Inactive", "Completed"])
    .withMessage("Invalid status"),

  body("city").optional().trim(),

  body("state").optional().trim(),

  body("pincode")
    .optional()
    .matches(/^\d{6}$/)
    .withMessage("Pincode must be 6 digits"),

  body("address").optional().trim(),

  body("notes").optional().trim(),

  validate,
];

/**
 * Update Student Validation
 */
export const updateStudentValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Student ID"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid Email"),

  body("phone")
    .optional()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid Mobile Number"),

  body("gender")
    .optional()
    .isIn(["Male", "Female", "Other"]),

  body("paymentStatus")
    .optional()
    .isIn(["Pending", "Partial", "Paid"]),

  body("status")
    .optional()
    .isIn(["Active", "Inactive", "Completed"]),

  validate,
];

/**
 * Mongo ID Validation
 */
export const studentIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Student ID"),

  validate,
];

/**
 * Student List Validation
 */
export const studentListValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 }),

  query("limit")
    .optional()
    .isInt({ min: 1 }),

  query("status")
    .optional()
    .isIn(["Active", "Inactive", "Completed"]),

  query("paymentStatus")
    .optional()
    .isIn(["Pending", "Partial", "Paid"]),
 validate,
];
/**
 * Change Student Status Validation
 */
export const changeStatusValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Student ID"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Active", "Inactive", "Completed"])
    .withMessage("Invalid status"),

  validate,
];


 