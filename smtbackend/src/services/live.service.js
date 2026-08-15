import Live from "../models/live.model.js";
import { uploadVideo } from "../config/cloudinary.js";

// ============================================
// CREATE LIVE
// ============================================

export const createLiveService = async (data, file) => {
  const {
    title,
    description,
    isLive,
    isActive,
  } = data;

  if (!title) {
    throw new Error("Title is required");
  }

  if (!file) {
    throw new Error("Video file is required");
  }

  const uploadedVideo = await uploadVideo(
    file,
    "SkillManthan/live"
  );

  const live = await Live.create({
    title,
    description,

    isLive:
      isLive === "true" || isLive === true,

    isActive:
      isActive === undefined
        ? true
        : isActive === "true" || isActive === true,

    video: {
      url: uploadedVideo.secure_url,
      publicId: uploadedVideo.public_id,
    },
  });

  return live;
};

// ============================================
// GET ALL LIVE
// ============================================

export const getLivesService = async () => {
  return await Live.find({
    isActive: true,
  }).sort({
    createdAt: -1,
  });
};

// ============================================
// GET SINGLE LIVE
// ============================================

export const getLiveByIdService = async (id) => {
  return await Live.findById(id);
};

// ============================================
// UPDATE LIVE
// ============================================

export const updateLiveService = async (
  id,
  data,
  file
) => {
  const live = await Live.findById(id);

  if (!live) {
    throw new Error("Live video not found");
  }

  const {
    title,
    description,
    isLive,
    isActive,
  } = data;

  if (title !== undefined) {
    live.title = title;
  }

  if (description !== undefined) {
    live.description = description;
  }

  if (isLive !== undefined) {
    live.isLive =
      isLive === "true" || isLive === true;
  }

  if (isActive !== undefined) {
    live.isActive =
      isActive === "true" || isActive === true;
  }

  // New video
  if (file) {
    const uploadedVideo = await uploadVideo(
      file,
      "SkillManthan/live"
    );

    live.video = {
      url: uploadedVideo.secure_url,
      publicId: uploadedVideo.public_id,
    };
  }

  await live.save();

  return live;
};

// ============================================
// DELETE LIVE
// ============================================

export const deleteLiveService = async (id) => {
  const live = await Live.findById(id);

  if (!live) {
    throw new Error("Live video not found");
  }

  await live.deleteOne();

  return live;
};