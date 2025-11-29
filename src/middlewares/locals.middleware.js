export function setLocals(req, res, next) {
  res.locals.user = req.user;
  console.log(req.session);
  next();
}
