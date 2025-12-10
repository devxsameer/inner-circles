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
import circlesRoutes from "./routes/circles.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import indexRoutes from "./routes/index.routes.js";

import globalErrorHandler from "./controllers/error.controller.js";
import AppError from "./utils/appError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

/* -------------------- VIEW ENGINE -------------------- */
app.engine(
  "handlebars",
  engine({
    extname: ".handlebars",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    helpers: hbsHelpers,
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

/* -------------------- PROXY SETTING FOR DEPLOYMENT ON RENDER -------------------- */

app.set("trust proxy", 1);

/* -------------------- CORE MIDDLEWARE -------------------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

/* -------------------- SESSION -------------------- */
app.use(sessionMiddleware);

/* -------------------- AUTH -------------------- */
app.use(passport.session());

/* -------------------- GLOBAL LOCALS -------------------- */
app.use(setLocals);

/* -------------------- ROUTES -------------------- */
app.use("/auth", authRoutes);
app.use("/circles", circlesRoutes);
app.use("/posts", postsRoutes);
app.use("/", indexRoutes);

/* -------------------- 404 -------------------- */
app.use((req, res, next) => {
  next(new AppError("Page not found", 404, req.originalUrl));
});

/* -------------------- ERROR HANDLER -------------------- */
app.use(globalErrorHandler);
