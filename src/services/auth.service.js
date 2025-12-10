// src/services/users.service.js

import {
  createUserInDb,
  getUserByIdFromDb,
  getUserByUsernameFromDb,
} from "../models/users.model.js";
import AppError from "../utils/appError.js";

import { hashPassword } from "../utils/hash.js";

/**
 * Register a new user
 */
export async function registerUser({ username, password }) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  try {
    const hashedPassword = await hashPassword(password);

    return await createUserInDb({
      username,
      hashedPassword,
    });
  } catch (err) {
    if (err.code === "23505") {
      throw new AppError(`Username "${username}" is already taken`, 409);
    }

    throw err;
  }
}

/**
 * Validate user credentials (used by Passport / auth flow)
 */
export async function validateUser(username, password, verifyFn) {
  if (!username || !password) return null;

  const user = await getUserByUsernameFromDb(username);

  if (!user) return null;

  const isValid = await verifyFn(password, user.passwordHash);

  return isValid ? user : null;
}

/**
 * Get user by id
 */
export async function getUserById(id) {
  return getUserByIdFromDb(id);
}
