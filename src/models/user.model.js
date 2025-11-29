import pool from "../database/pool.js";

export async function getUserByUsernameFromDb(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username=$1 LIMIT 1",
    [username]
  );
  return rows[0];
}

export async function getUserByIdFromDb(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id=$1 lIMIT 1", [
    id,
  ]);
  return rows[0];
}

export const createUserInDb = async ({ username, hashedPassword }) => {
  const { rows } = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *",
    [username, hashedPassword]
  );
  return rows[0];
};
