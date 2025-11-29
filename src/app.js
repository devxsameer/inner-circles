import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { sessionMiddleware } from "./middlewares/session.middleware.js";
import { setLocals } from "./middlewares/locals.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import passport from "./config/passport.config.js";
import { ensureAuth } from "./middlewares/auth.middleware.js";

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
app.get("/", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    if (req.session.views) {
      req.session.views++;
      res.render("index", {
        message:
          "<p>views: " +
          req.session.views +
          "</p> <p>expires in: " +
          req.session.cookie.maxAge / 1000 +
          "s</p>",
      });
    } else {
      req.session.views = 1;
      res.render("index", { message: "Welcome to Session. Refresh" });
    }
  } else {
    res.redirect("/auth/login");
  }
});

app.get("/protected", ensureAuth, (req, res) => {
  res.send("This is the protected route.");
});
