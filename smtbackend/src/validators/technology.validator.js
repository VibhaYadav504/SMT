export const validateTechnology = (data) => {
  const errors = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "Technology title is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};