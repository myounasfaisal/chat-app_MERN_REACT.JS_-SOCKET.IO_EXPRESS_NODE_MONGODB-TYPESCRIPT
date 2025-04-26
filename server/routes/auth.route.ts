import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { validateTokens } from "../middlewares/auth.middleware";
import { registerController } from "../controllers/auth.controller";

const authRouter = Router()

authRouter.route("/register").post(upload.single("profilePic"), registerController);

//Protected Routes

authRouter.route("/update-profile").patch(validateTokens,)