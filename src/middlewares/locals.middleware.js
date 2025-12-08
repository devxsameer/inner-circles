export function setLocals(req, res, next) {
  res.locals.user = req.user;
  res.locals.currentPath = req.path;
  next();
}
