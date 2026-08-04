import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Protect Routes
 */
 export const protect = asyncHandler(async (req, res, next) => {
  let token;


   console.log("Headers =>", req.headers);
  // Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }


  
   // Cookie Support (Future)
  if (!token && req.cookies?.token) {
     token = req.cookies.token;   }

   if (!token) {
    throw new ApiError(401, "Unauthorized. Please login.");
  }

// console.log("Authorization Header:", req.headers.authorization);
// console.log("Cookie Token =>", req.cookies?.token);
// console.log("Extracted Token:", token);

  // Verify JWT
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find User
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found.");
  }

  req.user = user;

  next();
});

/**
 * Role Based Authorization
 */
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

