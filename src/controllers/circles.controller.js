// src/controllers/circles.controller.js

import { matchedData, validationResult } from "express-validator";

import {
  createCircle,
  getAllCircles,
  deleteCircle as deleteCircleService,
  getCirclesOwnedByUser,
  getMembershipsInCircle,
} from "../services/circles.service.js";

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
  const role = req.membership?.role ?? null;

  if (role === "owner") {
    const members = await getMembershipsInCircle(req.circle.id);

    return res.render("circles/details", {
      title: req.circle.name,
      circle: req.circle,
      members,
    });
  }

  res.render("circles/details", {
    title: req.circle.name,
    circle: req.circle,
  });
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
