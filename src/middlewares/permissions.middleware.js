// src/middlewares/permissions.middleware.js
import AppError from "../utils/appError.js";

export function requirePermission(policyFn, resourceKey = null) {
  return (req, res, next) => {
    const resource = resourceKey ? req[resourceKey] : undefined;

    const allowed = resource ? policyFn(req, resource) : policyFn(req);

    if (!allowed) {
      return next(
        new AppError(
          "Forbidden: insufficient permissions",
          403,
          req.originalUrl
        )
      );
    }

    next();
  };
}
