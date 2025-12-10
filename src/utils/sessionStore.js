// src/utils/sessionStore.js
import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import pool from "../database/pool.js";

const PgSessionStore = connectPgSimple(session);

export function createSessionStore() {
  return new PgSessionStore({
    pool,
    tableName: "sessions",
    createTableIfMissing: true,
  });
}
