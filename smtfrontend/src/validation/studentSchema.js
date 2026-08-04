import { z } from "zod";

export const studentSchema = z.object({
  image: z.any().optional(),

  name: z
    .string()
    .min(3, "Full name is required"),

  email: z
    .string()
    .email("Enter valid email"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),

  gender: z
    .string()
    .min(1, "Select gender"),

  dob: z
    .string()
    .min(1, "Select date of birth"),

  course: z
    .string()
    .min(1, "Select course"),

  admissionDate: z
    .string()
    .min(1, "Select admission date"),

  fees: z.coerce
    .number()
    .min(1, "Fees is required"),

  status: z
    .string()
    .min(1, "Select status"),

  city: z
    .string()
    .min(2, "City is required"),

  state: z
    .string()
    .min(2, "State is required"),

  pincode: z
    .string()
    .min(6, "Enter valid pincode"),

  address: z
    .string()
    .min(5, "Address is required"),
});