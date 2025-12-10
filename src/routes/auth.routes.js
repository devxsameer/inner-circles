// src/routes/auth.routes.js
import { Router } from "express";
import {
  getLogin,
  getLogout,
  getSignup,
  postLogin,
  postSignup,
} from "../controllers/auth.controller.js";
import { loginLimiter } from "../middlewares/ratelimit.middleware.js";
import {
  loginValidator,
  signupValidator,
} from "../middlewares/validators/auth.validators.js";
import { ensureGuest } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes
  .route("/signup")
  .get(ensureGuest, getSignup)
  .post(ensureGuest, signupValidator, postSignup);

authRoutes
  .route("/login")
  .get(ensureGuest, getLogin)
  .post(loginLimiter, loginValidator, postLogin);

authRoutes.post("/logout", getLogout);

export default authRoutes;
