// src/app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";

import passport from "./config/passport.config.js";

import hbsHelpers from "./helpers/index.js";

import { sessionMiddleware } from "./middlewares/session.middleware.js";
import { setLocals } from "./middlewares/locals.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import clubsRoutes from "./routes/circles.routes.js";
import indexRoutes from "./routes/index.routes.js";

import globalErrorHandler from "./controllers/error.controller.js";

import AppError from "./utils/appError.js";
import postsRoutes from "./routes/posts.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// --- View Engine ---
app.engine(
  "handlebars",
  engine({
    extname: ".handlebars",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    helpers: hbsHelpers,
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// --- Middleware ---
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// --- Session ---
app.use(sessionMiddleware);

// --- Auth ---
app.use(passport.session());

// --- Global Locals ---
app.use(setLocals);

// --- Routes ---
app.use("/auth", authRoutes);
app.use("/circles", clubsRoutes);
app.use("/posts", postsRoutes);
app.use("/", indexRoutes);

// --- 404 Handler ---
app.use((req, res, next) => {
  next(
    new AppError(
      `If this were an API, you'd get { error: 'Not Found' }`,
      404,
      req.originalUrl
    )
  );
});

// --- Global Error Handler ---
app.use(globalErrorHandler);
