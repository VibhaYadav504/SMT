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
    startTime,
  } = data;

  // ============================================
  // REQUIRED FIELD VALIDATION
  // ============================================

  if (!title?.trim()) {
    throw new Error("Title is required");
  }

  if (!thumbnail?.trim()) {
    throw new Error("Thumbnail is required");
  }

  if (!meetUrl?.trim()) {
    throw new Error("Google Meet URL is required");
  }

  if (!startTime?.trim()) {
    throw new Error("Start time is required");
  }

  // ============================================
  // VALIDATE START TIME
  // ============================================

  const parsedStartTime = new Date(startTime.trim());

  if (Number.isNaN(parsedStartTime.getTime())) {
    throw new Error(
      "Invalid start time. Use format: YYYY-MM-DDTHH:mm:ss+05:30"
    );
  }

  // ============================================
  // CREATE LIVE
  // ============================================

  const live = await Live.create({
    title: title.trim(),
    thumbnail: thumbnail.trim(),
    description: description?.trim() || "",
    meetUrl: meetUrl.trim(),
    startTime: parsedStartTime,
  });

  return live;
};

// ============================================
// GET ALL LIVES
// ============================================

export const getLivesService = async () => {
  const lives = await Live.find()
    .sort({ startTime: 1 });

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
    startTime,
  } = data;

  // ============================================
  // UPDATE TITLE
  // ============================================

  if (title !== undefined) {
    if (!title?.trim()) {
      throw new Error("Title cannot be empty");
    }

    live.title = title.trim();
  }

  // ============================================
  // UPDATE THUMBNAIL
  // ============================================

  if (thumbnail !== undefined) {
    if (!thumbnail?.trim()) {
      throw new Error("Thumbnail cannot be empty");
    }

    live.thumbnail = thumbnail.trim();
  }

  // ============================================
  // UPDATE DESCRIPTION
  // ============================================

  if (description !== undefined) {
    live.description = description?.trim() || "";
  }

  // ============================================
  // UPDATE MEET URL
  // ============================================

  if (meetUrl !== undefined) {
    if (!meetUrl?.trim()) {
      throw new Error("Google Meet URL cannot be empty");
    }

    live.meetUrl = meetUrl.trim();
  }

  // ============================================
  // UPDATE START TIME
  // ============================================

  if (startTime !== undefined) {
    if (!startTime?.trim()) {
      throw new Error("Start time cannot be empty");
    }

    const parsedStartTime = new Date(startTime.trim());

    if (Number.isNaN(parsedStartTime.getTime())) {
      throw new Error(
        "Invalid start time. Use format: YYYY-MM-DDTHH:mm:ss+05:30"
      );
    }

    live.startTime = parsedStartTime;
  }

  // ============================================
  // SAVE
  // ============================================

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