export const validatePlacement = (data) => {
  const errors = {};

  if (!data.companyName || !data.companyName.trim()) {
    errors.companyName = "Company name is required";
  }

  if (!data.studentName || !data.studentName.trim()) {
    errors.studentName = "Student name is required";
  }

  if (!data.package || !data.package.trim()) {
    errors.package = "Package is required";
  }

  if (!data.designation || !data.designation.trim()) {
    errors.designation = "Designation is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};