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
  res.render("form", { title: "Add a new message" });
};

// handle new message submission
export const addNewMessage = (req, res) => {
  const { messageUser, messageText } = req.body;

  messages.push({
    id: nextId,
    text: messageText,
    user: messageUser,
    added: new Date(),
  });
  nextId += 1;

  res.redirect("/");
};

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
