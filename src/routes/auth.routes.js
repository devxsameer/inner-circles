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

const authRoutes = Router();

authRoutes.route("/signup").get(getSignup).post(postSignup);

authRoutes.route("/login").get(getLogin).post(loginLimiter, postLogin);

authRoutes.get("/logout", getLogout);

export default authRoutes;
