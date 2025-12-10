// src/middleware/loaders.js

import { getCircleById, getMembership } from "../services/circles.service.js";
import { getPostById } from "../services/posts.service.js";
import AppError from "../utils/appError.js";

/* -------------------------------------------------------
   Load Circle
------------------------------------------------------- */
export async function loadCircle(req, res, next) {
  const circleId = req.params?.circleId ?? req.post?.circleId;

  const circle = await getCircleById(circleId);

  if (!circle) {
    return next(
      new AppError(
        `If this were an API, you'd get { error: 'Not Found' }`,
        404,
        req.originalUrl
      )
    );
  }

  req.circle = circle;
  res.locals.circle = circle;

  next();
}

/* -------------------------------------------------------
   Load Membership
------------------------------------------------------- */
export async function loadMembership(req, res, next) {
  if (!req.user || !req.circle) {
    req.membership = null;
    res.locals.role = null;
    return next();
  }

  const membership = await getMembership(req.user.id, req.circle.id);

  req.membership = membership || null;
  res.locals.role = membership?.role || null;

  next();
}

/* -------------------------------------------------------
   Load Post
------------------------------------------------------- */
export async function loadPost(req, res, next) {
  const { postId } = req.params;
  const viewerId = req.user?.id ?? null;

  const post = await getPostById(postId, viewerId);

  if (!post) {
    return next(new AppError("Post not found", 404, req.originalUrl));
  }

  if (post.visibility === "members_only" && !post.viewerIsMember && !req.user) {
    return next(
      new AppError("This post is visible to members only", 403, req.originalUrl)
    );
  }

  req.post = post;
  res.locals.post = post;

  next();
}
