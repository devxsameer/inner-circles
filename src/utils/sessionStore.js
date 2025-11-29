import connectPg from "connect-pg-simple";
import session from "express-session";
import pool from "../database/pool.js";

const PgStore = connectPg(session);

export const sessionStore = new PgStore({
  pool,
  tableName: "session",
  createTableIfMissing: true,
});
