// src/models/users.model.js
import pool from "../database/pool.js";

function mapUser(row) {
  if (!row) return null;

  return {
    id: row.id,
    username: row.username,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
  };
}

export async function getUserByUsernameFromDb(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username=$1 LIMIT 1",
    [username]
  );

  return mapUser(rows[0]);
}

export async function getUserByIdFromDb(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id=$1 LIMIT 1", [
    id,
  ]);

  return mapUser(rows[0]);
}

export async function createUserInDb({ username, hashedPassword }) {
  const { rows } = await pool.query(
    "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *",
    [username, hashedPassword]
  );

  return mapUser(rows[0]);
}
