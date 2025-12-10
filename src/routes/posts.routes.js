// src/routes/posts.routes.js

import { Router } from "express";

import { ensureAuth } from "../middlewares/auth.middleware.js";
import {
  createPostsGet,
  createPostsPost,
  deletePostController,
  getPosts,
  showPost,
  updatePostGet,
  updatePostPost,
} from "../controllers/posts.controller.js";
import { postsValidator } from "../middlewares/validators/posts.validators.js";
import {
  loadCircle,
  loadMembership,
  loadPost,
} from "../middlewares/loaders.middleware.js";
import { canDeletePost, canUpdatePost } from "../policies/circles.policies.js";
import { requirePermission } from "../middlewares/permissions.middleware.js";

const postsRoutes = Router();

postsRoutes.get("/", getPosts);
postsRoutes
  .route("/create")
  .get(ensureAuth, createPostsGet)
  .post(ensureAuth, postsValidator, createPostsPost);

postsRoutes.get("/:postId", loadPost, showPost);
postsRoutes
  .route("/:postId/update")
  .get(
    ensureAuth,
    loadPost,
    loadCircle,
    loadMembership,
    requirePermission(canUpdatePost, "post"),
    updatePostGet
  )
  .post(
    ensureAuth,
    loadPost,
    loadCircle,
    loadMembership,
    requirePermission(canUpdatePost, "post"),
    postsValidator,
    updatePostPost
  );

postsRoutes.get(
  "/:postId/delete",
  ensureAuth,
  loadPost,
  loadCircle,
  loadMembership,
  requirePermission(canDeletePost, "post"),
  deletePostController
);
export default postsRoutes;
