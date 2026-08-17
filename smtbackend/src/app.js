import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bannerRoutes from "./routes/banner.routes.js";
import studentRoutes from "./routes/student.routes.js";
import indexRoutes from "./routes/index.routes.js";
import superAdminRoutes from "./routes/superAdmin.routes.js";
import technologyRoutes from "./routes/technologies.routes.js";
import courseRoutes from "./routes/course.routes.js";
import placementRoutes from "./routes/placement.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import liveRoutes from "./routes/live.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

/**
 * ============================
 * Global Middlewares
 * ============================
 */
// Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Postman ya same-origin requests ke liye
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS Error: ${origin} is not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Health Check
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Skill Manthan Backend API is Running...",
  });
});

/**
 * Routes
 */
app.use("/api/v1", indexRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/placements", placementRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/live", liveRoutes);
/**
 * 404
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/**
 * Global Error Handler
 */
app.use(errorHandler);

export default app;