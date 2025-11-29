import passport from "../config/passport.config.js";
import { registerUser } from "../services/auth.service.js";

export function getSignup(req, res) {
  res.render("signup", { title: "Sign Up" });
}

export async function postSignup(req, res, next) {
  const { username, password } = req.body;

  const user = await registerUser({ username, password });

  req.login(user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
}

export function getLogin(req, res) {
  res.render("login", { title: "Login" });
}

export async function postLogin(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.render("login", { title: "Login", error: info?.message });

    console.log(user);
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  })(req, res, next);
}

export function getLogout(req, res) {
  req.logout(() => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
}
