// src/models/users.model.js
import pool from "../database/pool.js";

/**
 * Maps a raw DB user row to app-safe user object
 */
function mapUser(row) {
  if (!row) return null;

  return {
    id: row.id,
    username: row.username,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
  };
}

/**
 * Get user by username (case-insensitive)
 */
export async function getUserByUsernameFromDb(username) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM users
    WHERE LOWER(username) = LOWER($1)
    LIMIT 1
    `,
    [username]
  );

  return mapUser(rows[0]);
}

/**
 * Get user by id
 */
export async function getUserByIdFromDb(id) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE id = $1 LIMIT 1",
    [id]
  );

  return mapUser(rows[0]);
}

/**
 * Create a new user
 * NOTE: duplicate username errors should be handled in service layer
 */
export async function createUserInDb({ username, hashedPassword }) {
  const { rows } = await pool.query(
    `
    INSERT INTO users (username, password_hash)
    VALUES ($1, $2)
    RETURNING *
    `,
    [username.toLowerCase(), hashedPassword]
  );

  return mapUser(rows[0]);
}
