import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Admin from "../models/admin.model.js";
import ApiError from "../utils/ApiError.js";

// ============================================
// ADMIN LOGIN SERVICE
// ============================================

export const loginAdminService = async (username, password) => {
  console.log("Username:", username);

  // Find Admin
  const admin = await Admin.findOne({ username });

  if (!admin) {
    throw new ApiError(401, "Invalid username");
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  // Remove password before sending response
  const adminData = admin.toObject();
  delete adminData.password;

  // Generate JWT Token
  const token = jwt.sign(
    {
      id: admin._id,
      role: "Admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  return {
    admin: adminData,
    token,
  };
};