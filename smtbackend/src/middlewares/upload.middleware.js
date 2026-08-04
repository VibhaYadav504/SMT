import multer from "multer";
import ApiError from "../utils/ApiError.js";

/**
 * Multer Memory Storage
 * Files will be uploaded to Cloudinary directly from memory.
 */
const storage = multer.memoryStorage();

/**
 * Allowed Image Types
 */
const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/**
 * File Filter
 */
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      ),
      false
    );
  }
};

/**
 * Multer Upload Instance
 */
const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter,
});

export default upload;