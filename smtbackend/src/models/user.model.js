import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

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

    role: {
      type: String,
      enum: ["Admin", "Staff"],
      default: "Staff",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: Date,



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


  
  {
    timestamps: true,
  }
);

/**
 * Hash Password
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

/**
 * Compare Password
 */
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);