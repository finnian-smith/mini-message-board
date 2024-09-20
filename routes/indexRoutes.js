import { Router } from "express";
import {
  renderIndex,
  renderForm,
  addNewMessage,
  showMessage,
} from "../controllers/messageController.js";

const indexRouter = Router();

indexRouter.get("/", renderIndex);

indexRouter.get("/new", renderForm);

indexRouter.post("/new", addNewMessage);

indexRouter.get("/messages/:id", showMessage);

export default indexRouter;
