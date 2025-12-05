// src/routes/circles.routes.js

import { Router } from "express";
import {
  createCircleGet,
  createCirclePost,
  deleteCircleController,
  getCircles,
  showCircle,
} from "../controllers/circles.controller.js";
import { circleValidator } from "../middlewares/validators/circles.validators.js";
import { ensureAuth } from "../middlewares/auth.middleware.js";
import {
  loadCircle,
  loadMembership,
} from "../middlewares/loaders.middleware.js";
import { requirePermission } from "../middlewares/permissions.middleware.js";
import { canManageMembers } from "../policies/circles.policies.js";

const circlesRoutes = Router();

circlesRoutes.get("/", getCircles);

circlesRoutes
  .route("/create")
  .get(ensureAuth, createCircleGet)
  .post(ensureAuth, circleValidator, createCirclePost);

circlesRoutes.get("/:circleId", loadCircle, loadMembership, showCircle);

circlesRoutes.get(
  "/:circleId/delete",
  ensureAuth,
  loadCircle,
  loadMembership,
  requirePermission(canManageMembers),
  deleteCircleController
);

export default circlesRoutes;
