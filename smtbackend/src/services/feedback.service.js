import Feedback from "../models/feedback.model.js";

export const createFeedback = async (data) => {
  return await Feedback.create(data);
};

export const getAllFeedbacks = async () => {
  return await Feedback.find().sort({ createdAt: -1 });
};

export const getFeedbackById = async (id) => {
  return await Feedback.findById(id);
};

export const updateFeedback = async (id, data) => {
  return await Feedback.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteFeedback = async (id) => {
  return await Feedback.findByIdAndDelete(id);
};