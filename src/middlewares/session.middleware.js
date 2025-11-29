import session from "express-session";
import { sessionStore } from "../utils/sessionStore.js";

export const sessionMiddleware = session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: false,
  },
});
