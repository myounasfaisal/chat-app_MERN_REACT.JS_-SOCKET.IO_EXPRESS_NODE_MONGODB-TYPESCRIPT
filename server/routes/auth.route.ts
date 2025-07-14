import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { validateTokens } from "../middlewares/auth.middleware";
import { checkAuthController, loginController, logoutController, signupController, updateController } from "../controllers/auth.controller";

const authRouter = Router()

authRouter.route("/signup").post(upload.single("profilePic"), signupController);
authRouter.route("/login").post(loginController);
authRouter.route("/logout").get(logoutController);

//Protected Routes

authRouter.route("/update-profile").patch(validateTokens,upload.single("profilePic"),updateController)
authRouter.route("/check").get(validateTokens,checkAuthController)

export default authRouter;