import multer from "multer";
import ApiError from "../utils/ApiError.js";

/**
 * Multer Memory Storage
 * Files will be uploaded to Cloudinary
 * directly from memory.
 */
const storage = multer.memoryStorage();

/**
 * Allowed Image + Video + PDF Types
 */
const allowedMimeTypes = [
  // Images
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",

  // Videos
  "video/mp4",
  "video/webm",
  "video/quicktime",

  // PDF
  "application/pdf",
];

/**
 * File Filter
 */
const fileFilter = (req, file, cb) => {
  console.log("Uploaded file:", {
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype,
  });

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        "Only JPG, JPEG, PNG, WEBP, MP4, WEBM, MOV and PDF files are allowed."
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
    fileSize: 100 * 1024 * 1024, // 100MB
  },

  fileFilter,
});

export default upload;