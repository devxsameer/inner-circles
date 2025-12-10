// src/config/passport.config.js
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { getUserById, validateUser } from "../services/auth.service.js";
import { verifyPassword } from "../utils/hash.js";

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      try {
        const user = await validateUser(username, password, verifyPassword);

        if (!user) {
          return done(null, false, {
            message: "Invalid credentials",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
