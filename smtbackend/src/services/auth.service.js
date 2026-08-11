import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import generateOtp from "../utils/generateOtp.js";
import sendEmail from "../utils/sendEmail.js";
import otpTemplate from "../templates/otpTemplate.js";

/**
 * Register User
 */
export const registerService = async (userData) => {
  const { email, phone } = userData;

  // Check Email
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new ApiError(409, "Email already exists");
  }

  // Check Phone
  const phoneExists = await User.findOne({ phone });

  if (phoneExists) {
    throw new ApiError(409, "Phone number already exists");
  }

  const user = await User.create(userData);

  const token = generateToken(user._id);

  return {
    user,
    token,
  };
};

/**
 * Login User
 */
export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  console.log("LOGIN EMAIL:", email);
  console.log("USER FOUND:", !!user);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  console.log("PASSWORD HASH EXISTS:", !!user.password);

  const isMatched = await user.comparePassword(password);

  console.log("PASSWORD MATCH:", isMatched);

  if (!isMatched) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account has been deactivated");
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);

  user.password = undefined;

  return {
    user,
    token,
  };
};

/**
 * Get Profile
 */
export const getProfileService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

/**
 * Update Profile
 */
export const updateProfileService = async (userId, data) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (data.phone && data.phone !== user.phone) {
    const exists = await User.findOne({
      phone: data.phone,
    });

    if (exists) {
      throw new ApiError(
        409,
        "Phone number already exists"
      );
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedUser;
};

/**
 * Change Password
 */
export const changePasswordService = async (
  userId,
  oldPassword,
  newPassword
) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) {
    throw new ApiError(401, "Old password is incorrect");
  }

  user.password = newPassword;

  await user.save();

  return true;
};

/**
 * Forgot Password
 */
export const forgotPasswordService = async ({ email }) => {
  const user = await User.findOne({ email }).select(
    "+resetOtp +resetOtpExpire"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Generate OTP
  const otp = generateOtp();

  // Hash OTP
  const hashedOtp = await bcrypt.hash(otp, 10);

  // Save OTP
  user.resetOtp = hashedOtp;
  user.resetOtpExpire = new Date(
    Date.now() +
      Number(process.env.OTP_EXPIRE) * 60 * 1000
  );

  user.isOtpVerified = false;

  await user.save();

  // Send Email
  await sendEmail({
    to: user.email,
    subject: "Skill Manthan Password Reset OTP",
    html: otpTemplate(otp, user.fullName),
  });

  return true;
};

/**
 * Verify Reset OTP
 */
export const verifyResetOtpService = async ({
  email,
  otp,
}) => {
  if (!email || !otp) {
    throw new ApiError(
      400,
      "Email and OTP are required"
    );
  }

  const user = await User.findOne({ email }).select(
    "+resetOtp +resetOtpExpire"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.resetOtp || !user.resetOtpExpire) {
    throw new ApiError(
      400,
      "OTP not found. Please request a new OTP."
    );
  }

  if (user.resetOtpExpire < Date.now()) {
    throw new ApiError(400, "OTP has expired");
  }

  const isOtpValid = await bcrypt.compare(
    otp,
    user.resetOtp
  );

  if (!isOtpValid) {
    throw new ApiError(400, "Invalid OTP");
  }

  user.isOtpVerified = true;

  await user.save();

  return {
    message: "OTP verified successfully",
  };
};

/**
 * Reset Password
 */
export const resetPasswordService = async ({
  email,
  newPassword,
  confirmPassword,
}) => {
  if (!email || !newPassword || !confirmPassword) {
    throw new ApiError(
      400,
      "Email, New Password and Confirm Password are required"
    );
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(
      400,
      "New Password and Confirm Password do not match"
    );
  }

  const user = await User.findOne({ email }).select(
    "+password +resetOtp +resetOtpExpire"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.isOtpVerified) {
    throw new ApiError(
      400,
      "Please verify OTP before resetting password"
    );
  }

  // Update Password
  user.password = newPassword;

  // Clear OTP Data
  user.resetOtp = undefined;
  user.resetOtpExpire = undefined;
  user.isOtpVerified = false;

  await user.save();

  return {
    message: "Password reset successfully",
  };
};