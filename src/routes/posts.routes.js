// src/routes/posts.routes.js

import { Router } from "express";

import { ensureAuth } from "../middlewares/auth.middleware.js";
import {
  createPostsGet,
  createPostsPost,
  getUserPosts,
} from "../controllers/posts.controller.js";
import { postsValidator } from "../middlewares/validators/posts.validators.js";

const postsRoutes = Router();

postsRoutes.get("/", ensureAuth, getUserPosts);
postsRoutes
  .route("/create")
  .get(ensureAuth, createPostsGet)
  .post(ensureAuth, postsValidator, createPostsPost);
export default postsRoutes;
