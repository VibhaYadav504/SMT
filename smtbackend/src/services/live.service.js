import Live from "../models/live.model.js";

// ============================================
// CREATE LIVE
// ============================================

export const createLiveService = async (data) => {
  const {
    title,
    thumbnail,
    description,
    meetUrl,
  } = data;

  // Required field validation
  if (!title) {
    throw new Error("Title is required");
  }

  if (!thumbnail) {
    throw new Error("Thumbnail is required");
  }

  if (!meetUrl) {
    throw new Error("Google Meet URL is required");
  }

  // Create Live
  const live = await Live.create({
    title,
    thumbnail,
    description: description || "",
    meetUrl,
  });

  return live;
};


// ============================================
// GET ALL LIVES
// ============================================

export const getLivesService = async () => {
  const lives = await Live.find()
    .sort({ createdAt: -1 });

  return lives;
};


// ============================================
// GET LIVE BY ID
// ============================================

export const getLiveByIdService = async (id) => {
  const live = await Live.findById(id);

  return live;
};


// ============================================
// UPDATE LIVE
// ============================================

export const updateLiveService = async (id, data) => {
  const live = await Live.findById(id);

  if (!live) {
    throw new Error("Live not found");
  }

  const {
    title,
    thumbnail,
    description,
    meetUrl,
  } = data;

  // Update only provided fields
  if (title !== undefined) {
    live.title = title;
  }

  if (thumbnail !== undefined) {
    live.thumbnail = thumbnail;
  }

  if (description !== undefined) {
    live.description = description;
  }

  if (meetUrl !== undefined) {
    live.meetUrl = meetUrl;
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
    throw new Error("Live not found");
  }

  await Live.findByIdAndDelete(id);

  return true;
};