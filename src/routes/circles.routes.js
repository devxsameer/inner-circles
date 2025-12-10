// src/routes/circles.routes.js

import { Router } from "express";
import {
  addMemberPost,
  changeRoleToAdminGet,
  changeRoleToMemberGet,
  createCircleGet,
  createCirclePost,
  deleteCircleController,
  getCircles,
  removeMemberGet,
  showCircle,
  updateCircleGet,
  updateCirclePost,
} from "../controllers/circles.controller.js";
import { circleValidator } from "../middlewares/validators/circles.validators.js";
import { ensureAuth } from "../middlewares/auth.middleware.js";
import {
  loadCircle,
  loadMembership,
} from "../middlewares/loaders.middleware.js";
import { requirePermission } from "../middlewares/permissions.middleware.js";
import {
  canDeleteCircle,
  canManageMembers,
} from "../policies/circles.policies.js";

const circlesRoutes = Router();

circlesRoutes.get("/", getCircles);

circlesRoutes
  .route("/create")
  .get(ensureAuth, createCircleGet)
  .post(ensureAuth, circleValidator, createCirclePost);

circlesRoutes.get("/:circleId", loadCircle, loadMembership, showCircle);

circlesRoutes
  .route("/:circleId/update")
  .get(
    ensureAuth,
    loadCircle,
    loadMembership,
    requirePermission(canManageMembers),
    updateCircleGet
  )
  .post(
    ensureAuth,
    loadCircle,
    loadMembership,
    requirePermission(canManageMembers),
    circleValidator,
    updateCirclePost
  );

circlesRoutes.get(
  "/:circleId/members/:memberId/remove",
  ensureAuth,
  loadCircle,
  loadMembership,
  requirePermission(canManageMembers),
  removeMemberGet
);
circlesRoutes.get(
  "/:circleId/members/:memberId/role/admin",
  ensureAuth,
  loadCircle,
  loadMembership,
  requirePermission(canManageMembers),
  changeRoleToAdminGet
);
circlesRoutes.get(
  "/:circleId/members/:memberId/role/member",
  ensureAuth,
  loadCircle,
  loadMembership,
  requirePermission(canManageMembers),
  changeRoleToMemberGet
);

circlesRoutes.get(
  "/:circleId/delete",
  ensureAuth,
  loadCircle,
  loadMembership,
  requirePermission(canDeleteCircle),
  deleteCircleController
);
circlesRoutes.post(
  "/:circleId/members/add",
  ensureAuth,
  loadCircle,
  loadMembership,
  requirePermission(canManageMembers),
  addMemberPost
);

export default circlesRoutes;
