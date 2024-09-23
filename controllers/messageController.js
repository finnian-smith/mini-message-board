import { validationResult } from "express-validator";
import { validateNewMessage } from "../middleware/validationMiddleware.js";

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Armando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello world!",
    user: "Charles",
    added: new Date(),
  },
];

let nextId = 3;

// render index page
export const renderIndex = (req, res) => {
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
  (req, res) => {
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

    messages.push({
      id: nextId,
      text: messageText,
      user: messageUser,
      added: new Date(),
    });
    nextId += 1;

    res.redirect("/");
  },
];

// handle displaying a single message
export const showMessage = (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === messageId);

  if (message) {
    res.render("message", { title: "Message Details", message: message });
  } else {
    res.status(404).send("Message not found");
  }
};
