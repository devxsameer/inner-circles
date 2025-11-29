import bcrypt from "bcrypt";

const SALT = 10;

export const hashPassword = (str) => bcrypt.hash(str, SALT);
export const verifyPassword = (str, hashed) => bcrypt.compare(str, hashed);
