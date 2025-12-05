// src/models/posts.model.js
import pool from "../database/pool.js";

function mapPost(row) {
  if (!row) return null;

  return {
    id: row.id,
    circleId: row.circle_id,
    authorId: row.author_id,
    title: row.title,
    body: row.body,
    createdAt: row.created_at,
    authorUsername: row.author_username || "Anonymous",
    circleName: row.circle_name || null,
    viewerIsMember: row.viewer_is_member ?? null,
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

/* -------------------------------------------------------
   GET POSTS FOR A CIRCLE
------------------------------------------------------- */
export async function getPostsByCircleFromDb({
  circleId,
  viewerId,
  visibilityList,
}) {
  const { rows } = await pool.query(
    `SELECT p.*,
            u.username AS author_username,
            CASE 
              WHEN cm.user_id IS NOT NULL THEN u.username
              ELSE NULL
            END AS author_username,
            (cm.user_id IS NOT NULL) AS viewer_is_member
     FROM posts p
     JOIN users u ON u.id = p.author_id
     LEFT JOIN circle_members cm
       ON cm.circle_id = p.circle_id
      AND cm.user_id = $2
     WHERE p.circle_id = $1 AND p.visibility = ANY($3)
     ORDER BY p.created_at DESC`,
    [circleId, viewerId, visibilityList]
  );

  return rows.map(mapPost);
}
/* -------------------------------------------------------
   GET POSTS OF A USER
------------------------------------------------------- */
export async function getPostsByAuthorFromDb({ userId }) {
  const { rows } = await pool.query(
    `SELECT p.*,
            c.name AS circle_name
     FROM posts p
     JOIN circles c ON c.id = p.circle_id
     WHERE p.author_id = $1
     ORDER BY p.created_at DESC`,
    [userId]
  );

  return rows.map(mapPost);
}

/* -------------------------------------------------------
   GET SINGLE POST
------------------------------------------------------- */
export async function getPostByIdFromDb({ postId }) {
  const { rows } = await pool.query(
    `SELECT p.*, 
            u.username AS author_username
     FROM posts p
     JOIN users u ON u.id = p.author_id
     WHERE p.id = $1`,
    [postId]
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

  return rows[0] || null; // return deleted post if needed
}

/* -------------------------------------------------------
   GET ALL POSTS (OPTIONAL viewerId)
------------------------------------------------------- */
export async function getAllPostsFromDb({ viewerId = null }) {
  const { rows } = await pool.query(
    `SELECT
        p.*,
        CASE
            WHEN cm.user_id IS NOT NULL THEN u.username
            ELSE NULL
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
    ORDER BY p.created_at DESC;`,
    [viewerId]
  );

  return rows.map(mapPost);
}
