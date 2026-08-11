import jwt from "jsonwebtoken";
import SuperAdmin from "../models/superAdmin.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protectSuperAdmin = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Get token from cookie
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(
      401,
      "Unauthorized. Please login as Super Admin."
    );
  }

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
        "Super Admin token expired. Please login again."
      );
    }

    throw new ApiError(
      401,
      "Invalid Super Admin token."
    );
  }

  // Make sure token belongs to Super Admin
  if (decoded.role !== "SuperAdmin") {
    throw new ApiError(
      403,
      "Only Super Admin can access this resource."
    );
  }

  // Find Super Admin
  const admin = await SuperAdmin.findById(decoded.id);

  if (!admin) {
    throw new ApiError(
      401,
      "Super Admin not found."
    );
  }

  req.superAdmin = admin;

  next();
});