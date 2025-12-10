// src/middlewares/locals.middleware.js
export function setLocals(req, res, next) {
  res.locals.user = req.user || null;
  res.locals.isAuthenticated = !!req.user;
  res.locals.currentPath = req.originalUrl;

  next();
}
