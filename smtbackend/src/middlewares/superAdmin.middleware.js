import jwt from "jsonwebtoken";
import SuperAdmin from "../models/superAdmin.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// ======================================================
// SUPER ADMIN PROTECT MIDDLEWARE
// ======================================================

export const protectSuperAdmin = asyncHandler(
  async (req, res, next) => {
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
        "Unauthorized. Please login as Super Admin."
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
      // Token expired
      if (error.name === "TokenExpiredError") {
        throw new ApiError(
          401,
          "Super Admin token expired. Please login again."
        );
      }

      // Invalid token
      if (error.name === "JsonWebTokenError") {
        throw new ApiError(
          401,
          "Invalid Super Admin token."
        );
      }

      // Other JWT errors
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
    // 6. CHECK SUPER ADMIN ROLE
    // ==================================================

    if (decoded.role !== "SuperAdmin") {
      throw new ApiError(
        403,
        "Only Super Admin can access this resource."
      );
    }

    // ==================================================
    // 7. CHECK SUPER ADMIN ID
    // ==================================================

    if (!decoded.id) {
      throw new ApiError(
        401,
        "Invalid Super Admin token payload."
      );
    }

    // ==================================================
    // 8. FIND SUPER ADMIN IN DATABASE
    // ==================================================

    const admin = await SuperAdmin.findById(
      decoded.id
    );

    if (!admin) {
      throw new ApiError(
        401,
        "Super Admin not found."
      );
    }

    // ==================================================
    // 9. OPTIONAL: CHECK ADMIN STATUS
    // ==================================================

    if (
      admin.isActive !== undefined &&
      admin.isActive === false
    ) {
      throw new ApiError(
        403,
        "Super Admin account is inactive."
      );
    }

    // ==================================================
    // 10. ATTACH ADMIN TO REQUEST
    // ==================================================

    req.superAdmin = admin;

    // ==================================================
    // 11. CONTINUE TO NEXT MIDDLEWARE / CONTROLLER
    // ==================================================

    next();
  }
);

// ======================================================
// DEFAULT EXPORT
// ======================================================

export default protectSuperAdmin;         