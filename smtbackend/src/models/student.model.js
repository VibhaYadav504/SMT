import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dob: {
      type: Date,
      required: true,
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

    course: {
      type: String,
      required: true,
      trim: true,
    },

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    fees: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Partial", "Paid"],
      default: "Pending",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Completed"],
      default: "Active",
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    state: {
      type: String,
      default: "",
      trim: true,
    },

    pincode: {
      type: String,
      default: "",
      trim: true,
    },

    notes: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Auto Generate Student ID
 * SMT000001
 */

studentSchema.pre("save", async function (next) {
  if (!this.isNew || this.studentId) return next();

  const Student = mongoose.model("Student");

  const count = await Student.countDocuments();

  this.studentId = `SMT${String(count + 1).padStart(6, "0")}`;

  next();
});

const Student = mongoose.model("Student", studentSchema);

export default Student;