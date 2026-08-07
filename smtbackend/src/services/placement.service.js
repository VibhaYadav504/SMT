import Placement from "../models/placement.model.js";

export const createPlacement = async (data) => {
  return await Placement.create(data);
};

export const getAllPlacements = async () => {
  return await Placement.find().sort({
    createdAt: -1,
  });
};

export const getPlacementById = async (id) => {
  return await Placement.findById(id);
};

export const updatePlacement = async (id, data) => {
  return await Placement.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deletePlacement = async (id) => {
  return await Placement.findByIdAndDelete(id);
};