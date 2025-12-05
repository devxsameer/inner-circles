// src/controllers/posts.controller.js

import { matchedData, validationResult } from "express-validator";
import {
  createPost,
  deletePost,
  getPostsByAuthor, // this must exist in your service
} from "../services/posts.service.js";

import { getCirclesUserIsMemberOf } from "../services/circles.service.js";

import AppError from "../utils/appError.js";

/* -------------------------------------------------------
   GET: User's Posts
------------------------------------------------------- */
export async function getUserPosts(req, res) {
  const userId = req.user?.id ?? null;

  const posts = await getPostsByAuthor(userId);

  res.render("posts", { title: "My Posts", posts });
}

/* -------------------------------------------------------
   GET: Create Post Form
------------------------------------------------------- */
export async function createPostsGet(req, res, next) {
  const userId = req.user?.id;

  // The user should be able to post in ANY circle they are a member of
  const userCircles = await getCirclesUserIsMemberOf(userId);

  console.log(userCircles);

  if (!userCircles.length) {
    return next(new AppError("Join a circle first to create a post", 400));
  }

  res.render("posts/create", {
    title: "Create New Post",
    userCircles,
  });
}

/* -------------------------------------------------------
   POST: Create New Post
------------------------------------------------------- */
export async function createPostsPost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("posts/create", {
      title: "Create New Post",
      errors: errors.array(),
      formData: req.body,
    });
  }

  const { circleId, title, body } = matchedData(req);

  console.log(circleId);

  await createPost({
    circleId,
    title,
    body,
    authorId: req.user.id,
  });

  res.redirect("/posts");
}

export async function deletePostController(req, res) {
  await deletePost(req.post.id);
  res.redirect("/posts");
}
