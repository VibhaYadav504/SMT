import Playlist from "../models/playlist.model.js";

export const createPlaylist = async (data) => {
  return await Playlist.create(data);
};

export const getAllPlaylists = async () => {
  return await Playlist.find()
    .populate("course", "name")
    .sort({ createdAt: -1 });
};

export const getPlaylistById = async (id) => {
  return await Playlist.findById(id)
    .populate("course", "name");
};

export const updatePlaylist = async (id, data) => {
  return await Playlist.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  ).populate("course", "name");
};

export const deletePlaylist = async (id) => {
  return await Playlist.findByIdAndDelete(id);
};