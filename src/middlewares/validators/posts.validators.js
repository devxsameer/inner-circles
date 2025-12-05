import { body } from "express-validator";

export const postsValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters."),
  body("body")
    .trim()
    .notEmpty()
    .withMessage("Body is required")
    .isLength({ min: 10 })
    .withMessage("Body cannot be shorter than 10 characters."),
  body("circleId")
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("Invalid genre selection."),
  body("visibility")
    .trim()
    .isIn(["public", "members_only"])
    .withMessage("Invalid visibility option."),
];
