// src/services/posts.service.js

import {
  createPostInDb,
  getPostsByCircleFromDb,
  getPostByIdFromDb,
  deletePostFromDb,
  getAllPostsFromDb,
  getPostsByAuthorFromDb,
  countPostsByCircleFromDb,
  countPostsByAuthorFromDb,
  countAllPostsFromDb,
  getLatestPublicPostsFromDb,
  updatePostInDb,
} from "../models/posts.model.js";
import { getPagination } from "../utils/pagination.js";

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
export async function updatePost({ postId, title, body, visibility }) {
  return await updatePostInDb({ postId, title, body, visibility });
}

export async function getLatestPublicPosts(limit = 6) {
  return await getLatestPublicPostsFromDb(limit);
}

/* -------------------------------------------------------
   GET ALL POSTS FROM A CIRCLE
------------------------------------------------------- */
export async function getPostsByCircle({
  circleId,
  viewerId,
  role,
  page = 1,
  limit = 10,
}) {
  const { limit: l, offset } = getPagination({ page, limit });

  const visibilityList = ["owner", "member", "admin"].includes(role)
    ? ["members_only", "public"]
    : ["public"];

  const posts = await getPostsByCircleFromDb({
    circleId,
    viewerId,
    visibilityList,
    limit: l,
    offset,
  });

  const total = await countPostsByCircleFromDb({
    circleId,
    visibilityList,
  });

  const totalPages = Math.ceil(total / l);

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    },
  };
}

/* -------------------------------------------------------
   GET ALL POSTS OF A Author
------------------------------------------------------- */
export async function getPostsByAuthor({ userId, page = 1, limit = 10 }) {
  const { limit: l, offset } = getPagination({ page, limit });

  const posts = await getPostsByAuthorFromDb({
    userId,
    limit: l,
    offset,
  });

  const total = await countPostsByAuthorFromDb({ userId });
  const totalPages = Math.ceil(total / l);

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    },
  };
}

/* -------------------------------------------------------
   GET SINGLE POST
------------------------------------------------------- */
export async function getPostById(postId, viewerId = null) {
  return await getPostByIdFromDb({ postId, viewerId });
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
export async function getAllPosts({ viewerId = null, page = 1, limit = 10 }) {
  const { limit: l, offset } = getPagination({ page, limit });

  const posts = await getAllPostsFromDb({
    viewerId,
    limit: l,
    offset,
  });

  const total = await countAllPostsFromDb();
  const totalPages = Math.ceil(total / l);

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    },
  };
}
