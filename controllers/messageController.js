import { validationResult } from "express-validator";
import { validateNewMessage } from "../middleware/validationMiddleware.js";
import db from "../db/queries.js";

// render index page
export const renderIndex = async (req, res) => {
  let messages = await db.getAllMessages();
  res.render("index", { title: "Mini Message Board", messages: messages });
};

// render form page
export const renderForm = (req, res) => {
  res.render("form", {
    title: "Add a new message",
    errors: [],
  });
};

// handle new message submission with validation
export const addNewMessage = [
  validateNewMessage,

  // process request after validation and sanitisation
  async (req, res) => {
    // extract validation errors from request
    const errors = validationResult(req);

    // validation fails -> render form again with error messages
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        title: "Add a new message",
        errors: errors.array(),
        messageUser: req.body.messageUser,
        messageText: req.body.messageText,
      });
    }

    // no validation errors -> create new message
    const { messageUser, messageText } = req.body;

    await db.insertNewMessage(messageText, messageUser);

    res.redirect("/");
  },
];

// handle displaying a single message
export const showMessage = async (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = await db.getMessageById(messageId);

  if (message) {
    res.render("message", { title: "Message Details", message: message });
  } else {
    res.status(404).send("Message not found");
  }
};
