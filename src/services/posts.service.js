// src/services/posts.service.js

import {
  createPostInDb,
  getPostsByCircleFromDb,
  getPostByIdFromDb,
  deletePostFromDb,
  getAllPostsFromDb,
  getPostsByAuthorFromDb,
} from "../models/posts.model.js";

/* -------------------------------------------------------
   CREATE POST
------------------------------------------------------- */
export async function createPost({
  circleId,
  authorId,
  title,
  body,
  visibility,
}) {
  return await createPostInDb({ circleId, authorId, title, body, visibility });
}

/* -------------------------------------------------------
   GET ALL POSTS FROM A CIRCLE
------------------------------------------------------- */
export async function getPostsByCircle({ circleId, viewerId, role }) {
  if (["owner", "member", "admin"].includes(role)) {
    return await getPostsByCircleFromDb({
      circleId,
      viewerId,
      visibilityList: ["members_only", "public"],
    });
  } else {
    return await getPostsByCircleFromDb({
      circleId,
      viewerId,
      visibilityList: ["public"],
    });
  }
}

/* -------------------------------------------------------
   GET ALL POSTS OF A Author
------------------------------------------------------- */
export async function getPostsByAuthor(userId) {
  return await getPostsByAuthorFromDb({ userId });
}

/* -------------------------------------------------------
   GET SINGLE POST
------------------------------------------------------- */
export async function getPostById(postId) {
  return await getPostByIdFromDb({ postId });
}

/* -------------------------------------------------------
   DELETE POST
------------------------------------------------------- */
export async function deletePost(postId) {
  return await deletePostFromDb({ postId });
}

/* -------------------------------------------------------
   GET ALL POSTS (optionally include viewerId)
------------------------------------------------------- */
export async function getAllPosts(viewerId = null) {
  return await getAllPostsFromDb({ viewerId });
}
