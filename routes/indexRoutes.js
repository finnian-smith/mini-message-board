import { Router, text } from "express";

const indexRouter = Router();

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

let nextId = 3; // simple way to handle IDs here

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Message Board", messages: messages });
});

indexRouter.get("/new", (req, res) => {
  res.render("form", { title: "Add a new message" });
});

indexRouter.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({
    id: nextId,
    text: messageText,
    user: messageUser,
    added: new Date(),
  });
  nextId += 1;
  res.redirect("/");
});

indexRouter.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id == messageId);

  if (message) {
    res.render("message", { title: "Message Details", message: message });
  } else {
    res.status(404).send("Message not found");
  }
});

export default indexRouter;
