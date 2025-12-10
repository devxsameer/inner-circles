// src/models/circles.model.js
import pool from "../database/pool.js";

function mapCircle(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    ownerId: row.owner_id,
    createdAt: row.created_at,
    membersCount: row.members_count,
    ownerUsername: row.owner_username || null,
  };
}

function mapMembership(row) {
  if (!row) return null;

  return {
    id: row.id,
    userId: row.user_id,
    circleId: row.circle_id,
    role: row.role,
    joinedAt: row.joined_at,
    username: row.username,
  };
}

/* -------------------------------------------------------
   CREATE CIRCLE
------------------------------------------------------- */
export async function createCircleInDb({ name, description, ownerId }) {
  const { rows } = await pool.query(
    `INSERT INTO circles (name, description, owner_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, description, ownerId]
  );

  return mapCircle(rows[0]);
}

export async function updateCircleInDb({ circleId, name, description }) {
  const { rows } = await pool.query(
    `
    UPDATE circles
    SET
      name = COALESCE($1, name),
      description = COALESCE($2, description)
    WHERE id = $3
    RETURNING *
    `,
    [name ?? null, description ?? null, circleId]
  );

  return mapCircle(rows[0]);
}

export async function insertOwnerAsMemberInDb({ ownerId, circleId }) {
  const { rows } = await pool.query(
    `INSERT INTO circle_members (user_id, circle_id, role)
     VALUES ($1, $2, 'owner')
     RETURNING *`,
    [ownerId, circleId]
  );

  return rows[0];
}

/* -------------------------------------------------------
   READ CIRCLES
------------------------------------------------------- */
export async function getAllCirclesFromDb() {
  const { rows } = await pool.query(
    `SELECT c.*, u.username AS owner_username
     FROM circles c
     JOIN users u ON u.id = c.owner_id
     ORDER BY c.created_at DESC`
  );

  return rows.map(mapCircle);
}
export async function getPopularCirclesFromDb(limit = 6) {
  const { rows } = await pool.query(
    `SELECT c.*, u.username AS owner_username
     FROM circles c
     JOIN users u ON u.id = c.owner_id
     ORDER BY c.members_count DESC
     LIMIT $1`,
    [limit]
  );

  return rows.map(mapCircle);
}

export async function getCirclesOwnedByUserFromDb({ userId }) {
  const { rows } = await pool.query(
    `SELECT *
     FROM circles
     WHERE owner_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return rows.map(mapCircle);
}

export async function getCirclesUserIsMemberOfFromDb({ userId }) {
  const { rows } = await pool.query(
    `SELECT c.*, cm.role
     FROM circle_members cm
     JOIN circles c ON c.id = cm.circle_id
     WHERE cm.user_id = $1
     ORDER BY cm.joined_at DESC`,
    [userId]
  );

  return rows.map(mapCircle);
}

export async function getCircleByIdFromDb({ id }) {
  const { rows } = await pool.query(
    `SELECT c.*, u.username AS owner_username
     FROM circles c
     JOIN users u ON u.id = c.owner_id
     WHERE c.id = $1`,
    [id]
  );
  return mapCircle(rows[0]);
}

/* -------------------------------------------------------
   DELETE CIRCLE
------------------------------------------------------- */

export async function deleteCircleFromDb({ circleId }) {
  const { rows } = await pool.query(
    `DELETE FROM circles
     WHERE id = $1
     RETURNING *`,
    [circleId]
  );

  return mapCircle(rows[0]);
}

/* -------------------------------------------------------
   MEMBERSHIP FUNCTIONS
------------------------------------------------------- */
export async function getMembershipFromDb({ userId, circleId }) {
  const { rows } = await pool.query(
    `SELECT *
     FROM circle_members
     WHERE user_id = $1 AND circle_id = $2`,
    [userId, circleId]
  );
  return mapMembership(rows[0]);
}

export async function getMembershipsInCircleFromDb({ circleId }) {
  const { rows } = await pool.query(
    `SELECT cm.*, u.username
     FROM circle_members cm
     JOIN users u ON u.id = cm.user_id
     WHERE circle_id = $1`,
    [circleId]
  );
  return rows.map(mapMembership);
}

export async function addMemberInDb({ circleId, userId, role }) {
  const { rows } = await pool.query(
    `INSERT INTO circle_members (user_id, circle_id, role)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, circle_id)
     DO UPDATE SET role = EXCLUDED.role
     RETURNING *`,
    [userId, circleId, role]
  );
  return mapMembership(rows[0]);
}
export async function removeMemberFromDb({ circleId, userId }) {
  const { rows } = await pool.query(
    `DELETE FROM circle_members
     WHERE user_id = $1 AND circle_id = $2
     RETURNING *`,
    [userId, circleId]
  );
  return mapMembership(rows[0]);
}

export async function changeRoleInDb({ circleId, userId, role }) {
  const { rows } = await pool.query(
    `UPDATE circle_members
     SET role = $3
     WHERE user_id = $1 AND circle_id = $2
     RETURNING *`,
    [userId, circleId, role]
  );

  return mapMembership(rows[0]);
}
