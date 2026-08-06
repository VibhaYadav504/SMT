import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
  addTechnology,
  fetchTechnologies,
  fetchTechnology,
  editTechnology,
  removeTechnology,
} from "../controllers/technologies.controller.js";



const router = express.Router();

router.post("/", upload.single("image"), addTechnology);

router.get("/", fetchTechnologies);

router.get("/:id", fetchTechnology);

router.put("/:id", upload.single("image"), editTechnology);

router.delete("/:id", removeTechnology);

export default router;