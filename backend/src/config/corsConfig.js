import dotenv from "dotenv";
dotenv.config();

const localFrontend = process.env.FRONTEND_URL || "http://localhost:5173";
const renderFrontend = process.env.RENDER_FRONTEND_URL || "https://codenest-developers.onrender.com";

export const corsOptions = {
  origin: [localFrontend, renderFrontend],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
};
