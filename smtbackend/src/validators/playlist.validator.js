export const validatePlaylist = (data) => {
  const errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = "Playlist name is required";
  }

  if (data.description && !data.description.trim()) {
    errors.description = "Description cannot be empty";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};