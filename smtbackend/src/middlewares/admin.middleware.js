import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// ======================================================
// ADMIN PROTECT MIDDLEWARE
// ======================================================

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // ==================================================
  // 1. GET TOKEN FROM AUTHORIZATION HEADER
  // ==================================================

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // ==================================================
  // 2. GET TOKEN FROM COOKIE
  // ==================================================

  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  // ==================================================
  // 3. TOKEN NOT FOUND
  // ==================================================

  if (!token) {
    throw new ApiError(
      401,
      "Unauthorized. Please login as Admin."
    );
  }

  // ==================================================
  // 4. VERIFY JWT TOKEN
  // ==================================================

  let decoded;

  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(
        401,
        "Admin token expired. Please login again."
      );
    }

    if (error.name === "JsonWebTokenError") {
      throw new ApiError(
        401,
        "Invalid Admin token."
      );
    }

    throw new ApiError(
      401,
      "Authentication failed."
    );
  }

  // ==================================================
  // 5. CHECK JWT PAYLOAD
  // ==================================================

  if (!decoded) {
    throw new ApiError(
      401,
      "Invalid authentication token."
    );
  }

  // ==================================================
  // 6. CHECK ADMIN ROLE
  // ==================================================

  if (decoded.role !== "Admin") {
    throw new ApiError(
      403,
      "Only Admin can access this resource."
    );
  }

  // ==================================================
  // 7. CHECK ADMIN ID
  // ==================================================

  if (!decoded.id) {
    throw new ApiError(
      401,
      "Invalid Admin token payload."
    );
  }

  // ==================================================
  // 8. FIND ADMIN IN DATABASE
  // ==================================================

  const admin = await Admin.findById(decoded.id);

  if (!admin) {
    throw new ApiError(
      401,
      "Admin not found."
    );
  }

  // ==================================================
  // 9. CHECK ADMIN STATUS
  // ==================================================

  if (
    admin.isActive !== undefined &&
    admin.isActive === false
  ) {
    throw new ApiError(
      403,
      "Admin account is inactive."
    );
  }

  // ==================================================
  // 10. ATTACH ADMIN TO REQUEST
  // ==================================================

  req.admin = admin;

  // ==================================================
  // 11. NEXT
  // ==================================================

  next();
});

// ======================================================
// REQUIRE ADMIN
// ======================================================

export const requireAdmin = asyncHandler(
  async (req, res, next) => {
    if (!req.admin) {
      throw new ApiError(
        401,
        "Unauthorized. Admin access required."
      );
    }

    next();
  }
);

// ======================================================
// DEFAULT EXPORT
// ======================================================

export default protect;