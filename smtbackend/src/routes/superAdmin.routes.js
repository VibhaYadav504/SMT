import { Router } from "express";

import { loginSuperAdmin } from "../controllers/superAdmin.controller.js";
import { superAdminLoginValidator } from "../validators/superAdmin.validator.js";

const router = Router();


router.post(
  "/login",
  superAdminLoginValidator,
  loginSuperAdmin
);

export default router;