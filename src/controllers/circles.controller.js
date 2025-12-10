// src/controllers/circles.controller.js

import { matchedData, validationResult } from "express-validator";

import {
  createCircle,
  getAllCircles,
  deleteCircle as deleteCircleService,
  getCirclesOwnedByUser,
  getMembershipsInCircle,
  updateCircle,
  removeMember,
  changeRole,
  getMembership,
  addMemberByUsername,
} from "../services/circles.service.js";
import { getPostsByCircle } from "../services/posts.service.js";
import { ROLES } from "../utils/constants.js";

/* -------------------------------------------------------
   SHOW: Create circle form
------------------------------------------------------- */
export function createCircleGet(req, res) {
  res.render("circles/create", { title: "Create New Circle" });
}

/* -------------------------------------------------------
   POST: Create circle
------------------------------------------------------- */
export async function createCirclePost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("circles/create", {
      title: "Create New Circle",
      errors: errors.array(),
      formData: req.body,
    });
  }

  const { name, description } = matchedData(req);

  await createCircle({ name, description, ownerId: req.user.id });

  res.redirect("/circles");
}

/* -------------------------------------------------------
   GET: Show single circle
------------------------------------------------------- */
export async function showCircle(req, res) {
  const page = parseInt(req.query.page) || 1;
  const role = req.membership?.role ?? null;

  const { posts: circlePosts, pagination } = await getPostsByCircle({
    circleId: req.circle.id,
    role,
    viewerId: req.user?.id ?? null,
    page,
    limit: 6,
  });

  const isMember = Boolean(role);

  if (isMember) {
    const members = await getMembershipsInCircle(req.circle.id);

    return res.render("circles/details", {
      title: req.circle.name,
      circle: req.circle,
      circlePosts,
      pagination,
      members,
    });
  }

  res.render("circles/details", {
    title: req.circle.name,
    circlePosts,
    pagination,
    circle: req.circle,
  });
}

export async function updateCircleGet(req, res) {
  const members = await getMembershipsInCircle(req.circle.id);

  res.render("circles/update", {
    title: "Update " + req.circle.name,
    circle: req.circle,
    members,
  });
}
export async function updateCirclePost(req, res) {
  const errors = validationResult(req);
  const members = await getMembershipsInCircle(req.circle.id);

  if (!errors.isEmpty()) {
    return res.render("circles/update", {
      title: "Update " + req.circle.name,
      errors: errors.array(),
      circle: req.circle,
      members,
    });
  }

  const { name, description } = matchedData(req);

  await updateCircle({ name, description, circleId: req.circle.id });

  res.redirect("/circles/" + req.circle.id);
}

/* -------------------------------------------------------
   GET: All circles
------------------------------------------------------- */
export async function getCircles(req, res) {
  const userId = req?.user?.id ?? null;

  const [allCircles, ownedCircles] = await Promise.all([
    getAllCircles(),
    getCirclesOwnedByUser(userId),
  ]);

  res.render("circles", {
    title: "All Circles",
    circles: allCircles,
    ownedCircles,
  });
}

/* -------------------------------------------------------
   DELETE: Delete circle
------------------------------------------------------- */
export async function deleteCircleController(req, res) {
  await deleteCircleService(req.circle.id);
  res.redirect("/circles");
}

export async function removeMemberGet(req, res) {
  await removeMember({
    circleId: req.params.circleId,
    actorUserId: req.user.id,
    actorRole: req.membership.role,
    targetUserId: Number(req.params.memberId),
  });

  res.redirect(`/circles/${req.params.circleId}`);
}
export async function changeRoleToAdminGet(req, res) {
  await changeRole({
    circleId: Number(req.params.circleId),
    actorUserId: req.user.id,
    actorRole: req.membership.role,
    targetUserId: Number(req.params.memberId),
    newRole: ROLES.ADMIN,
  });

  res.redirect(`/circles/${req.params.circleId}`);
}

export async function changeRoleToMemberGet(req, res) {
  await changeRole({
    circleId: req.params.circleId,
    actorUserId: req.user.id,
    actorRole: req.membership.role,
    targetUserId: Number(req.params.memberId),
    newRole: ROLES.MEMBER,
  });

  res.redirect(`/circles/${req.params.circleId}`);
}

export async function addMemberPost(req, res, next) {
  const { circleId } = req.params;
  const { username } = req.body;

  if (!username) {
    throw new Error("Username is required");
  }

  await addMemberByUsername({
    circleId: Number(circleId),
    actorUserId: req.user.id,
    actorRole: req.membership.role,
    username,
  });

  res.redirect(`/circles/${circleId}`);
}
