import { errorHandler } from "./../../error-handler";
import { Router } from "express";
import { login, me, signup } from "../../controllers/auth.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/signup", errorHandler(signup));
authRouter.post("/login", errorHandler(login));
authRouter.get("/me", [authMiddleware], errorHandler(me));

export default authRouter;
