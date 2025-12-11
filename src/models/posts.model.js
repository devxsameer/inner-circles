// src/models/posts.model.js
import pool from "../database/pool.js";

function mapPost(row) {
  if (!row) return null;

  return {
    id: row.id,
    circleId: row.circle_id,
    authorId: row.author_id ?? null,
    title: row.title,
    body: row.body,
    visibility: row.visibility,
    createdAt: row.created_at,
    authorUsername: row.author_username ?? "Anonymous",
    circleName: row.circle_name ?? null,
    viewerIsMember: Boolean(row.viewer_is_member),
  };
}

/* -------------------------------------------------------
   CREATE POST
------------------------------------------------------- */
export async function createPostInDb({
  circleId,
  authorId,
  title,
  body,
  visibility,
}) {
  const { rows } = await pool.query(
    `INSERT INTO posts (circle_id, author_id, title, body, visibility)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [circleId, authorId, title, body, visibility]
  );

  return mapPost(rows[0]);
}
export async function updatePostInDb({ postId, title, body, visibility }) {
  const { rows } = await pool.query(
    `UPDATE posts
    SET
      title = COALESCE($1, title),
      body = COALESCE($2, body),
      visibility = COALESCE($3, visibility)
    WHERE id = $4
    RETURNING *`,
    [title ?? null, body ?? null, visibility ?? null, postId]
  );

  return mapPost(rows[0]);
}

/* -------------------------------------------------------
   COUNT POSTS
------------------------------------------------------- */

export async function countVisiblePostsByCircleFromDb({ circleId, viewerId }) {
  const { rows } = await pool.query(
    `SELECT COUNT(*) AS total
     FROM posts p
     LEFT JOIN circle_members cm
       ON cm.circle_id = p.circle_id
      AND cm.user_id = $2
     WHERE p.circle_id = $1
       AND (
         p.visibility = 'public'
         OR (p.visibility = 'members_only' AND cm.user_id IS NOT NULL)
       )`,
    [circleId, viewerId]
  );

  return Number(rows[0].total);
}

export async function countAllPostsFromDb({ viewerId = null }) {
  const { rows } = await pool.query(
    `SELECT 
       COUNT(*) AS total
     FROM posts p
     LEFT JOIN circle_members cm
       ON cm.circle_id = p.circle_id
      AND cm.user_id = $1
     WHERE 
       p.visibility = 'public'
       OR (p.visibility = 'members_only' AND cm.user_id IS NOT NULL)
    `,
    [viewerId]
  );

  return Number(rows[0].total);
}

export async function countPostsByAuthorFromDb({ userId }) {
  const { rows } = await pool.query(
    `SELECT COUNT(*) AS total
     FROM posts
     WHERE author_id = $1`,
    [userId]
  );

  return Number(rows[0].total);
}

/* -------------------------------------------------------
   GET POSTS FOR A CIRCLE
------------------------------------------------------- */
export async function getPostsByCircleFromDb({
  circleId,
  viewerId,
  limit,
  offset,
}) {
  const { rows } = await pool.query(
    `SELECT p.*,
        CASE 
          WHEN p.visibility = 'public' AND cm.user_id IS NULL THEN 'Anonymous'
          ELSE u.username
        END AS author_username,
        (cm.user_id IS NOT NULL) AS viewer_is_member
     FROM posts p
     JOIN users u ON u.id = p.author_id
     LEFT JOIN circle_members cm
       ON cm.circle_id = p.circle_id
      AND cm.user_id = $2
     WHERE p.circle_id = $1
       AND (
         p.visibility = 'public' 
         OR (p.visibility = 'members_only' AND cm.user_id IS NOT NULL)
       )
     ORDER BY p.created_at DESC
     LIMIT $3 OFFSET $4`,
    [circleId, viewerId, limit, offset]
  );

  return rows.map(mapPost);
}

export async function getLatestPublicPostsFromDb(limit = 6) {
  const { rows } = await pool.query(
    `SELECT 
        p.id,
        p.title,
        p.body,
        c.name AS circle_name,
        c.id AS circle_id,
        'Anonymous' AS author_username
     FROM posts p
     JOIN circles c ON c.id = p.circle_id
     WHERE p.visibility = 'public'
     ORDER BY p.created_at DESC
     LIMIT $1`,
    [limit]
  );

  return rows.map(mapPost);
}

/* -------------------------------------------------------
   GET POSTS OF A USER
------------------------------------------------------- */
export async function getPostsByAuthorFromDb({ userId, limit, offset }) {
  const { rows } = await pool.query(
    `SELECT p.*,
            c.name AS circle_name
     FROM posts p
     JOIN circles c ON c.id = p.circle_id
     WHERE p.author_id = $1
     ORDER BY p.created_at DESC LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );

  return rows.map(mapPost);
}

/* -------------------------------------------------------
   GET SINGLE POST
------------------------------------------------------- */
export async function getPostByIdFromDb({ postId, viewerId = null }) {
  const { rows } = await pool.query(
    `SELECT
        p.*,
        CASE
          WHEN p.visibility = 'public' AND cm.user_id IS NULL THEN 'Anonymous'
          ELSE u.username
        END AS author_username,
        c.name AS circle_name,
        c.id AS circle_id,
        (cm.user_id IS NOT NULL) AS viewer_is_member
     FROM posts p
     JOIN users u ON u.id = p.author_id
     JOIN circles c ON c.id = p.circle_id
     LEFT JOIN circle_members cm
       ON cm.circle_id = p.circle_id
      AND cm.user_id = $2
     WHERE p.id = $1
       AND (
         p.visibility = 'public'
         OR (p.visibility = 'members_only' AND cm.user_id IS NOT NULL)
       )`,
    [postId, viewerId]
  );

  return mapPost(rows[0]);
}

/* -------------------------------------------------------
   DELETE POST
------------------------------------------------------- */
export async function deletePostFromDb({ postId }) {
  const { rows } = await pool.query(
    `DELETE FROM posts
     WHERE id = $1
     RETURNING *`,
    [postId]
  );

  return rows[0] || null;
}

/* -------------------------------------------------------
   GET ALL POSTS (OPTIONAL viewerId)
------------------------------------------------------- */
export async function getAllPostsFromDb({ viewerId = null, limit, offset }) {
  const { rows } = await pool.query(
    `SELECT 
        p.*,
        CASE
          WHEN p.visibility = 'public' AND cm.user_id IS NULL THEN 'Anonymous'
          ELSE u.username
        END AS author_username,
        c.name AS circle_name,
        c.id AS circle_id,
        (cm.user_id IS NOT NULL) AS viewer_is_member
     FROM posts p
     JOIN users u ON u.id = p.author_id
     JOIN circles c ON c.id = p.circle_id
     LEFT JOIN circle_members cm
        ON cm.circle_id = p.circle_id
       AND cm.user_id = $1
     WHERE 
       p.visibility = 'public'
       OR (p.visibility = 'members_only' AND cm.user_id IS NOT NULL)
     ORDER BY p.created_at DESC
     LIMIT $2 OFFSET $3`,
    [viewerId, limit, offset]
  );

  return rows.map(mapPost);
}
