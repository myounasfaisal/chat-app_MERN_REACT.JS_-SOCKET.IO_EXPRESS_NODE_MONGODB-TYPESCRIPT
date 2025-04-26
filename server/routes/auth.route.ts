import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { validateTokens } from "../middlewares/auth.middleware";
import { checkAuthController, loginController, registerController, updateController } from "../controllers/auth.controller";

const authRouter = Router()

authRouter.route("/register").post(upload.single("profilePic"), registerController);
authRouter.route("/login").post(loginController);


//Protected Routes

authRouter.route("/update-profile").patch(validateTokens,updateController)
authRouter.route("/check").get(validateTokens,checkAuthController)

export default authRouter;