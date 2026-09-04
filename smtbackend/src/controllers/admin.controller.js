import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import { loginAdminService } from "../services/admin.service.js";

// ============================================
// ADMIN LOGIN
// ============================================

export const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const data = await loginAdminService(
    username,
    password
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Admin Login Successful",
      data
    )
  );
});