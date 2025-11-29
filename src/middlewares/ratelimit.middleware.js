// src/middlewares/ratelimit.middleware.js
import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 attempts
  message: "Too many login attempts. Try again later.",
});
