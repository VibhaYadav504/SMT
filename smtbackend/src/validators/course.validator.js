export const validateCourse = (data) => {
  const errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = "Course name is required";
  }

  if (!data.description || !data.description.trim()) {
    errors.description = "Course description is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};