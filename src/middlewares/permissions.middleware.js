// src/middlewares/permissions.middleware.js

import AppError from "../utils/appError.js";

/**
 * Generic permission middleware.
 * policyFn receives (req) OR (req, resource)
 * Example:
 *    requirePermission(canManageMembers)
 *    requirePermission(canDeletePost, "post")
 */
export function requirePermission(policyFn, resourceKey = null) {
  return (req, res, next) => {
    const resource = resourceKey ? req[resourceKey] : undefined;

    const allowed = resource ? policyFn(req, resource) : policyFn(req);

    if (!allowed) {
      return next(new AppError("Forbidden: Not allowed", 403));
    }

    next();
  };
}
