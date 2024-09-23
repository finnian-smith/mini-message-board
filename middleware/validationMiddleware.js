// validationMiddleware.js
import { body } from "express-validator";

export const validateNewMessage = [
  body("messageUser").trim().notEmpty().withMessage("Name is required"),
  body("messageText").trim().notEmpty().withMessage("Message text is required"),
];
