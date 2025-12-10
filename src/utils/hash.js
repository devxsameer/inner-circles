// src/utils/hash.js
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Hash a plain-text password
 */
export async function hashPassword(password) {
  if (!password) {
    throw new Error("Password is required for hashing");
  }

  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a plain-text password against a hash
 */
export async function verifyPassword(password, hashedPassword) {
  if (!password || !hashedPassword) return false;

  return bcrypt.compare(password, hashedPassword);
}
