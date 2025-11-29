import { body } from "express-validator";

export const signupValidator = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username too short"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars"),
];

export const loginValidator = [
  body("username").notEmpty(),
  body("password").notEmpty(),
];
