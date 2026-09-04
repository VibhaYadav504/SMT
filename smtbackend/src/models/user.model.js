
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // ============================================
    // FULL NAME
    // ============================================
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================
    // EMAIL
    // ============================================
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // ============================================
    // PHONE
    // ============================================
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // ============================================
    // PASSWORD
    // ============================================
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // ============================================
    // PROFILE IMAGE
    // ============================================
    profileImage: {
      public_id: {
        type: String,
        default: "",
      },

      url: {
        type: String,
        default: "",
      },
    },

    // ============================================
    // USER ROLE
    // ============================================
    role: {
      type: String,
      enum: ["Student"],
      default: "Student",
    },

    // ============================================
    // ACCOUNT STATUS
    // ============================================
    isActive: {
      type: Boolean,
      default: true,
    },

    // ============================================
    // LAST LOGIN
    // ============================================
    lastLogin: {
      type: Date,
    },

    // ============================================
    // PASSWORD RESET OTP
    // ============================================
    resetOtp: {
      type: String,
      select: false,
    },

    resetOtpExpire: {
      type: Date,
      select: false,
    },

    isOtpVerified: {
      type: Boolean,
      default: false,
    },
  },

  // ============================================
  // TIMESTAMPS
  // ============================================
  {
    timestamps: true,
  }
);

// ============================================
// HASH PASSWORD BEFORE SAVE
// ============================================

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(
    this.password,
    10
  );
});

// ============================================
// COMPARE PASSWORD
// ============================================

userSchema.methods.comparePassword = async function (
  password
) {
  return await bcrypt.compare(
    password,
    this.password
  );
};

export default mongoose.model(
  "User",
  userSchema
);

