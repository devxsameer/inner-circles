// src/middlewares/validators/auth.validators.js
import { body } from "express-validator";

export const signupValidator = [
  body("username")
    .trim()
    .toLowerCase()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .matches(/^[a-z0-9_]+$/)
    .withMessage("Username can contain letters, numbers, underscores only"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .not()
    .matches(/\s/)
    .withMessage("Password cannot contain spaces"),
];

export const loginValidator = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
