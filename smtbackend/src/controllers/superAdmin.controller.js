import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import { loginSuperAdminService } from "../services/superAdmin.service.js";

export const loginSuperAdmin = asyncHandler(
  async (req, res) => {
    const { username, password } = req.body;

    const data = await loginSuperAdminService(
      username,
      password
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Super Admin Login Successful",
        data
      )
    );
  }
);