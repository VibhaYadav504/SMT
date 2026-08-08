import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import ApiError from "../utils/ApiError.js";

/**
 * Cloudinary Configuration
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload Single Image
 */
export const uploadImage = (file, folder = "SkillManthan") => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new ApiError(400, "No file provided"));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Image Error:", error);
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

/**
 * Upload Video
 */
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

    const uploadStream = cloudinary.uploader.upload_stream(
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

/**
 * Upload Multiple Images
 */
export const uploadMultipleImages = async (
  files,
  folder = "SkillManthan"
) => {
  const uploadedImages = [];

  for (const file of files) {
    const image = await uploadImage(file, folder);

    uploadedImages.push({
      public_id: image.public_id,
      url: image.secure_url,
    });
  }

  return uploadedImages;
};

/**
 * Delete Image
 */
export const deleteImage = async (publicId) => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
};

/**
 * Delete Video
 */
export const deleteVideo = async (publicId) => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "video",
  });
};

export default cloudinary;