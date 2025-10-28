import rateLimit from "express-rate-limit";

// Limit to 100 requests per 15 minutes per IP
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: "Too many requests from this IP, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
