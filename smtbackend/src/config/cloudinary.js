import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import ApiError from "../utils/ApiError.js";

// ============================================
// Cloudinary Environment Variables
// ============================================

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

// ============================================
// Validate Cloudinary Configuration
// ============================================

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(
    "Cloudinary environment variables are missing. Please check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET."
  );
}

// ============================================
// Cloudinary Configuration
// ============================================

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// ============================================
// Upload Single Image
// ============================================

export const uploadImage = (
  file,
  folder = "SkillManthan"
) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(
        new ApiError(400, "No image provided")
      );
    }

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error(
              "Cloudinary Image Error:",
              error
            );

            return reject(error);
          }

          resolve(result);
        }
      );

    streamifier
      .createReadStream(file.buffer)
      .pipe(uploadStream);
  });
};

// ============================================
// Upload Video
// ============================================

export const uploadVideo = (
  file,
  folder = "SkillManthan/Videos"
) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(
        new ApiError(400, "No video provided")
      );
    }

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "video",
        },
        (error, result) => {
          if (error) {
            console.error(
              "Cloudinary Video Error:",
              error
            );

            return reject(error);
          }

          resolve(result);
        }
      );

    streamifier
      .createReadStream(file.buffer)
      .pipe(uploadStream);
  });
};

// ============================================
// Upload PDF
// ============================================

export const uploadPdf = (
  file,
  folder = "SkillManthan/PDFs"
) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(
        new ApiError(400, "No PDF provided")
      );
    }

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "raw",
        },
        (error, result) => {
          if (error) {
            console.error(
              "Cloudinary PDF Error:",
              error
            );

            return reject(error);
          }

          resolve(result);
        }
      );

    streamifier
      .createReadStream(file.buffer)
      .pipe(uploadStream);
  });
};

// ============================================
// Upload Multiple Images
// ============================================

export const uploadMultipleImages = async (
  files,
  folder = "SkillManthan"
) => {
  if (!files || files.length === 0) {
    throw new ApiError(
      400,
      "No images provided"
    );
  }

  const uploadedImages = [];

  for (const file of files) {
    const image = await uploadImage(
      file,
      folder
    );

    uploadedImages.push({
      public_id: image.public_id,
      url: image.secure_url,
    });
  }

  return uploadedImages;
};

// ============================================
// Delete Image
// ============================================

export const deleteImage = async (
  publicId
) => {
  if (!publicId) return null;

  return await cloudinary.uploader.destroy(
    publicId,
    {
      resource_type: "image",
    }
  );
};

// ============================================
// Delete Video
// ============================================

export const deleteVideo = async (
  publicId
) => {
  if (!publicId) return null;

  return await cloudinary.uploader.destroy(
    publicId,
    {
      resource_type: "video",
    }
  );
};

// ============================================
// Delete PDF
// ============================================

export const deletePdf = async (
  publicId
) => {
  if (!publicId) return null;

  return await cloudinary.uploader.destroy(
    publicId,
    {
      resource_type: "raw",
    }
  );
};

// ============================================
// Default Export
// ============================================

export default cloudinary;