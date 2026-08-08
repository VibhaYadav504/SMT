export const validateFeedback = (data) => {
  const errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.email || !data.email.trim()) {
    errors.email = "Email is required";
  }

  if (!data.message || !data.message.trim()) {
    errors.message = "Feedback message is required";
  }

  if (
    data.rating !== undefined &&
    (Number(data.rating) < 1 || Number(data.rating) > 5)
  ) {
    errors.rating = "Rating must be between 1 and 5";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};