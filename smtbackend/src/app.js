import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bannerRoutes from "./routes/banner.routes.js";
import studentRoutes from "./routes/student.routes.js";
import indexRoutes from "./routes/index.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

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