import {
  createUserInDb,
  getUserByIdFromDb,
  getUserByUsernameFromDb,
} from "../models/user.model.js";

import { hashPassword } from "../utils/hash.js";

export const registerUser = async ({ username, password }) => {
  const hashed = await hashPassword(password);
  return createUserInDb({ username, hashedPassword: hashed });
};

export const validateUser = async (username, password, verifyFn) => {
  const user = await getUserByUsernameFromDb(username);
  if (!user) return null;

  const ok = await verifyFn(password, user.password);
  return ok ? user : null;
};

export { getUserByIdFromDb as getUserById };
