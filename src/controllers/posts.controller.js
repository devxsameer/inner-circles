// src/controllers/posts.controller.js

import { matchedData, validationResult } from "express-validator";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostsByAuthor,
  updatePost,
} from "../services/posts.service.js";

import { getCirclesUserIsMemberOf } from "../services/circles.service.js";
import AppError from "../utils/appError.js";

/* ========================================================================
   CONTROLLER: Posts
   Handles displaying posts, creating posts, updating posts, and deleting posts.
   Business logic lives in services; this layer handles validation + rendering.
   ======================================================================== */

/* ------------------------------------------------------------------------
   GET /posts
   Display:
   - All posts visible to the user (global feed)
   - Posts created by the user (owned posts)
   Supports pagination on both sections.
------------------------------------------------------------------------ */
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
    allPosts,
    ownedPosts,
    allPostsPagination,
    ownedPostsPagination,
  });
}

/* ------------------------------------------------------------------------
   GET /posts/:id
   Display a single post. req.post is loaded by param middleware.
------------------------------------------------------------------------ */
export async function showPost(req, res) {
  res.render("posts/details", {
    title: req.post.title,
    post: req.post,
  });
}

/* ------------------------------------------------------------------------
   GET /posts/create
   Show form for creating a new post.
   User must be a member of at least one circle.
------------------------------------------------------------------------ */
export async function createPostsGet(req, res, next) {
  const userId = req.user?.id;

  const userCircles = await getCirclesUserIsMemberOf(userId);

  if (!userCircles.length) {
    return next(
      new AppError("Create or join a circle first to create a post", 403)
    );
  }

  res.render("posts/create", {
    title: "Create New Post",
    userCircles,
  });
}

/* ------------------------------------------------------------------------
   GET /posts/:id/update
   Display the update form for a post.
   req.post is provided by middleware.
------------------------------------------------------------------------ */
export async function updatePostGet(req, res) {
  res.render("posts/update", {
    title: "Update Post",
  });
}

/* ------------------------------------------------------------------------
   POST /posts/:id/update
   Handle post update submission.
   Validated data only (matchedData).
------------------------------------------------------------------------ */
export async function updatePostPost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("posts/update", {
      title: "Update Post",
      errors: errors.array(),
    });
  }

  const { title, body, visibility } = matchedData(req);

  await updatePost({
    postId: req.post.id,
    title,
    visibility,
    body,
  });

  res.redirect(`/posts/${req.post.id}`);
}

/* ------------------------------------------------------------------------
   POST /posts/create
   Handle creation of a new post.
------------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------------
   POST /posts/:id/delete
   Delete a post (authorization handled by middleware).
------------------------------------------------------------------------ */
export async function deletePostController(req, res) {
  await deletePost(req.post.id);
  res.redirect("/posts");
}
