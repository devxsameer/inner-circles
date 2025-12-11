// src/services/posts.service.js

import {
  createPostInDb,
  getPostsByCircleFromDb,
  getPostByIdFromDb,
  deletePostFromDb,
  getAllPostsFromDb,
  getPostsByAuthorFromDb,
  countPostsByAuthorFromDb,
  countAllPostsFromDb,
  getLatestPublicPostsFromDb,
  updatePostInDb,
  countVisiblePostsByCircleFromDb,
} from "../models/posts.model.js";

import { getPagination } from "../utils/pagination.js";

/* -------------------------------------------------------
   CREATE + UPDATE
------------------------------------------------------- */
export const createPost = (data) => createPostInDb(data);
export const updatePost = (data) => updatePostInDb(data);

export const getLatestPublicPosts = (limit = 6) =>
  getLatestPublicPostsFromDb(limit);

/* -------------------------------------------------------
   GET POSTS FROM A CIRCLE (viewer-aware)
------------------------------------------------------- */
export async function getPostsByCircle({
  circleId,
  viewerId,
  page = 1,
  limit = 10,
}) {
  const { limit: l, offset } = getPagination({ page, limit });

  const posts = await getPostsByCircleFromDb({
    circleId,
    viewerId,
    limit: l,
    offset,
  });

  // NEW: count only posts that viewer can see
  const total = await countVisiblePostsByCircleFromDb({
    circleId,
    viewerId,
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
   POSTS BY AUTHOR
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
   SINGLE POST
------------------------------------------------------- */
export const getPostById = (postId, viewerId = null) =>
  getPostByIdFromDb({ postId, viewerId });

/* -------------------------------------------------------
   DELETE POST
------------------------------------------------------- */
export const deletePost = (postId) => deletePostFromDb({ postId });

/* -------------------------------------------------------
   GET ALL POSTS (global feed)
------------------------------------------------------- */
export async function getAllPosts({ viewerId = null, page = 1, limit = 10 }) {
  const { limit: l, offset } = getPagination({ page, limit });

  const posts = await getAllPostsFromDb({
    viewerId,
    limit: l,
    offset,
  });

  const total = await countAllPostsFromDb({ viewerId });
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
