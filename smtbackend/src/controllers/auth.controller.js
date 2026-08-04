import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  registerService,
  loginService,
  getProfileService,
  updateProfileService,
  changePasswordService,
  forgotPasswordService,
  verifyResetOtpService,
  resetPasswordService,
} from "../services/auth.service.js";

/**
 * Register User
 */
export const register = asyncHandler(async (req, res) => {
  const { user, token } = await registerService(req.body);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json(
      new ApiResponse(
        201,
        "User registered successfully",
        {
          user,
          token,
        }
      )
    );
});

/**
 * Login User
 */
export const login = asyncHandler(async (req, res) => {
  const { user, token } = await loginService(req.body);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Login successful",
        {
          user,
          token,
        }
      )
    );
});

/**
 * Logout User
 */
export const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Logout successful",
        null
      )
    );
});

/**
 * Get Logged In User Profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await getProfileService(req.user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Profile fetched successfully",
      user
    )
  );
});

/**
 * Update Profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await updateProfileService(
    req.user._id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Profile updated successfully",
      user
    )
  );
});

/**
 * Change Password
 */
export const changePassword = asyncHandler(async (req, res) => {
  await changePasswordService(
    req.user._id,
    req.body.oldPassword,
    req.body.newPassword
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Password changed successfully",
      null
    )
  );
});

/**
 * Forgot Password
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  await forgotPasswordService(req.body);

  return res.status(200).json(
    new ApiResponse(
      200,
      "OTP sent successfully to your email",
      null
    )
  );
});

/**
 * Verify Reset OTP
 */
export const verifyResetOtp = async (req, res, next) => {
  try {
    const result = await verifyResetOtpService(req.body);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset Password
 */
export const resetPassword = async (req, res, next) => {
  try {
    const result = await resetPasswordService(req.body);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};