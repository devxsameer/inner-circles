import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { getUserById, validateUser } from "../services/auth.service.js";
import { verifyPassword } from "../utils/hash.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await validateUser(username, password, verifyPassword);

    if (!user)
      return done(null, false, { message: "Invalid username or password" });

    return done(null, user);
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await getUserById(id);
  done(null, user);
});

export default passport;
