export function setLocals(req, res, next) {
  res.locals.user = req.user;
  next();
}
