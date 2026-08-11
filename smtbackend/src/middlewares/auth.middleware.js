import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Cookie Support
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized. Please login.");
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
        "Token expired. Please login again."
      );
    }

    throw new ApiError(
      401,
      "Invalid token."
    );
  }

  const user = await User.findById(decoded.id)
    .select("-password");

  if (!user) {
    throw new ApiError(
      401,
      "User not found."
    );
  }

  if (!user.isActive) {
    throw new ApiError(
      401,
      "User account is inactive."
    );
  }

  req.user = user;

  next();
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        "You don't have permission to access this resource."
      );
    }

    next();
  };
};