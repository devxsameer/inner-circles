// src/controllers/posts.controller.js

import { matchedData, validationResult } from "express-validator";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostsByAuthor, // this must exist in your service
} from "../services/posts.service.js";

import { getCirclesUserIsMemberOf } from "../services/circles.service.js";

import AppError from "../utils/appError.js";

/* -------------------------------------------------------
   GET: User's Posts
------------------------------------------------------- */
export async function getPosts(req, res) {
  const userId = req?.user?.id ?? null;
  const ownedPostsPage = parseInt(req.query.ownedPostsPage) || 1;
  const allPostsPage = parseInt(req.query.allPostsPage) || 1;

  const [
    { posts: allPosts, pagination: allPostsPagination },
    { posts: ownedPosts, pagination: ownedPostsPagination },
  ] = await Promise.all([
    getAllPosts({ viewerId: userId, page: allPostsPage, limit: 9 }),
    getPostsByAuthor({ userId, page: ownedPostsPage, limit: 6 }),
  ]);

  res.render("posts", {
    title: "All Posts",
    ownedPostsPagination,
    allPosts,
    ownedPosts,
    allPostsPagination,
  });
}

export async function showPost(req, res) {
  res.render("posts/details", {
    title: req.post.title,
    post: req.post,
  });
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
    return next(
      new AppError("Create or join  a circle first to create a post", 403)
    );
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
    const userCircles = await getCirclesUserIsMemberOf(req.user?.id);

    return res.render("posts/create", {
      title: "Create New Post",
      errors: errors.array(),
      formData: req.body,
      userCircles,
    });
  }

  const { circleId, title, body, visibility } = matchedData(req);

  await createPost({
    circleId,
    title,
    body,
    visibility,
    authorId: req.user.id,
  });

  res.redirect("/posts");
}

export async function deletePostController(req, res) {
  await deletePost(req.post.id);
  res.redirect("/posts");
}
