import mongoose from "mongoose";
const technologySchema = new mongoose.Schema(
    {
       title: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, 
    }
);
export default mongoose.model("Technology",technologySchema);