import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  addPlacement,
  fetchPlacements,
  fetchPlacement,
  editPlacement,
  removePlacement,
} from "../controllers/placement.controller.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    {
      name: "companyLogo",
      maxCount: 1,
    },
    {
      name: "studentImage",
      maxCount: 1,
    },
  ]),
  addPlacement
);

router.get("/", fetchPlacements);

router.get("/:id", fetchPlacement);

router.put(
  "/:id",
  upload.fields([
    {
      name: "companyLogo",
      maxCount: 1,
    },
    {
      name: "studentImage",
      maxCount: 1,
    },
  ]),
  editPlacement
);

router.delete("/:id", removePlacement);

export default router;