import { errorHandler } from "./../../error-handler";
import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import {
  addAddress,
  changeUserRole,
  deleteAddress,
  getUserById,
  listAddress,
  listUsers,
  updateUser,
} from "../../controllers/user.controller";
import adminMiddleware from "../../middlewares/admin.middleware";

const userRouter = Router();

userRouter.post("/address", [authMiddleware], errorHandler(addAddress));
userRouter.delete(
  "/address/:id",
  [authMiddleware],
  errorHandler(deleteAddress)
);
userRouter.get("/address", [authMiddleware], errorHandler(listAddress));
userRouter.put("/", [authMiddleware], errorHandler(updateUser));
userRouter.put(
  "/:id/role",
  [authMiddleware, adminMiddleware],
  errorHandler(changeUserRole)
);
userRouter.get("/", [authMiddleware, adminMiddleware], errorHandler(listUsers));
userRouter.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(getUserById)
);

export default userRouter;
