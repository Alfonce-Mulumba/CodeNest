import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { corsOptions } from "./config/corsConfig.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // Needed for secure cookies & rate limiting on Render
  console.log("⚙️ Running in production mode: trust proxy enabled");
}

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", apiLimiter);

// API routes
app.use("/api/services", serviceRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ CodeNest backend running on port ${PORT}`);
});
