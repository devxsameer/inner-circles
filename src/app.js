// src/app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import passport from "./config/passport.config.js";

import { sessionMiddleware } from "./middlewares/session.middleware.js";
import { setLocals } from "./middlewares/locals.middleware.js";
import { ensureAuth } from "./middlewares/auth.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import clubsRoutes from "./routes/circles.routes.js";
import indexRoutes from "./routes/index.routes.js";

import globalErrorHandler from "./controllers/error.controller.js";

import AppError from "./utils/appError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// --- View Engine ---
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- Middleware ---
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// --- Session ---
app.use(sessionMiddleware);

// --- Auth ---
app.use(passport.session());

// --- Global Locals ---
app.use(setLocals);

// --- Routes ---
app.use("/auth", authRoutes);
app.use("/circles", ensureAuth, clubsRoutes);
app.use("/", indexRoutes);

// --- 404 Handler ---
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// --- Global Error Handler ---
app.use(globalErrorHandler);
