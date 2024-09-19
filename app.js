import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/indexRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware to server static files
app.use(express.static(path.join(__dirname, "public")));

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// index router
app.use("/", indexRouter);

// start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App now running on port ${PORT}`);
});
