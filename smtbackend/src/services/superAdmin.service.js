import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import SuperAdmin from "../models/superAdmin.model.js";
import ApiError from "../utils/ApiError.js";

export const loginSuperAdminService = async (username, password) => {

  console.log("Username:", username);
const admin = await SuperAdmin.findOne({ username });

if (!admin) {
  throw new ApiError(401, "Invalid username");
}

if (password !== admin.password) {
  throw new ApiError(401, "Invalid password");
}

// Password remove before sending response
const adminData = admin.toObject();
delete adminData.password;

const token = jwt.sign(
  {
    id: admin._id,
    role: "SuperAdmin",
  },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXPIRE,
  }
);

return {
  admin: adminData,
  token,
};
 
};