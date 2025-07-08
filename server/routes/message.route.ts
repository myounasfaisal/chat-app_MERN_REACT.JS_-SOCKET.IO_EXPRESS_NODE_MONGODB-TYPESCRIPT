import { Router } from "express";
import { getMessagesController, getUsersController, sendMessageController } from "../controllers/message.controller";
import { validateTokens } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const messageRouter=Router();

messageRouter.get("/get-users",validateTokens,getUsersController);
messageRouter.get("/get-messages/:id",validateTokens,getMessagesController)
messageRouter.post(
  "/send-message/:id",
  validateTokens,
  upload.single("image"),
  sendMessageController
);



export default messageRouter;