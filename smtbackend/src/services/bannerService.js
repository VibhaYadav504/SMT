import Banner from "../models/banner.model.js";

export const createBanner = async (data) => {
  return await Banner.create(data);
};

export const getAllBanners = async () => {
  return await Banner.find();
};

export const getBannerById = async (id) => {
  return await Banner.findById(id);
};

export const updateBanner = async (id, data) => {
  return await Banner.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBanner = async (id) => {
  return await Banner.findByIdAndDelete(id);
};