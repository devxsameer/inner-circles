// src/controllers/auth.controller.js
import { matchedData, validationResult } from "express-validator";
import passport from "../config/passport.config.js";
import { registerUser } from "../services/auth.service.js";

export function getSignup(req, res) {
  res.render("signup", { title: "Sign Up" });
}

export async function postSignup(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("signup", {
      title: "Sign Up",
      errors: errors.array(),
      formData: req.body,
    });
  }

  const { username, password } = matchedData(req);

  const user = await registerUser({ username, password });

  req.session.regenerate((err) => {
    if (err) return next(err);

    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  });
}

export function getLogin(req, res) {
  res.render("login", { title: "Login" });
}

export function postLogin(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.render("login", {
        title: "Login",
        errors: [{ msg: info?.message || "Invalid credentials" }],
      });
    }

    req.session.regenerate((err) => {
      if (err) return next(err);

      req.login(user, (err) => {
        if (err) return next(err);

        const redirectTo = req.query.next || "/";
        res.redirect(redirectTo);
      });
    });
  })(req, res, next);
}

export function getLogout(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("innercircles.sid");
      res.redirect("/");
    });
  });
}
