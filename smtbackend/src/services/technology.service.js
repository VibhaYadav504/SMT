import Technology from "../models/technologies.model.js";

// Create Technology
export const createTechnology = async (data) => {
  return await Technology.create(data);
};

// Get All Technologies
export const getAllTechnologies = async () => {
  return await Technology.find().sort({ createdAt: -1 });
};

// Get Technology By ID
export const getTechnologyById = async (id) => {
  return await Technology.findById(id);
};

// Update Technology
export const updateTechnology = async (id, data) => {
  return await Technology.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete Technology
export const deleteTechnology = async (id) => {
  return await Technology.findByIdAndDelete(id);
};