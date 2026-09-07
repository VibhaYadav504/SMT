import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import indexRoutes from "./routes/index.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import bannerRoutes from "./routes/banner.routes.js";
import technologyRoutes from "./routes/technologies.routes.js";
import courseRoutes from "./routes/course.routes.js";
import placementRoutes from "./routes/placement.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import liveRoutes from "./routes/live.routes.js";
import introCourseRoutes from "./routes/introcourse.routes.js";

import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// ============================================
// CORS
// ============================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS Error: ${origin} is not allowed`)
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ============================================
// BODY PARSER
// ============================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// OTHER MIDDLEWARES
// ============================================

app.use(cookieParser());
app.use(morgan("dev"));

// ============================================
// HEALTH CHECK
// ============================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Skill Manthan Backend API is Running...",
  });
});

// ============================================
// ROUTES
// ============================================

app.use("/api/v1", indexRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/banner", bannerRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/technologies", technologyRoutes);

app.use("/api/playlists", playlistRoutes);

app.use("/api/placements", placementRoutes);

app.use("/api/feedbacks", feedbackRoutes);

app.use("/api/live", liveRoutes);

app.use("/api/introcourse", introCourseRoutes);

// ============================================
// 404
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ============================================
// ERROR HANDLER
// ============================================

app.use(errorHandler);

export default app;