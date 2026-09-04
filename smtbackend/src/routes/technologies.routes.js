import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
  addTechnology,
  fetchTechnologies,
  fetchTechnology,
  editTechnology,
  removeTechnology,
} from "../controllers/technologies.controller.js";

import { protect } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", fetchTechnologies);

router.get("/:id", fetchTechnology);

router.post(
  "/",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  addTechnology
);

router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  editTechnology
);

router.delete(
  "/:id",
  protect,
  removeTechnology
);

export default router;