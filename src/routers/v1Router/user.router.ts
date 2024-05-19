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

// Address
userRouter.get("/address", [authMiddleware], errorHandler(listAddress));
userRouter.post("/address", [authMiddleware], errorHandler(addAddress));
userRouter.delete(
  "/address/:id",
  [authMiddleware],
  errorHandler(deleteAddress)
);

// GET all users
userRouter.get("/", [authMiddleware, adminMiddleware], errorHandler(listUsers));
userRouter.put("/", [authMiddleware], errorHandler(updateUser));

//GET single user
userRouter.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(getUserById)
);

//change USER ROLE
userRouter.put(
  "/:id/role",
  [authMiddleware, adminMiddleware],
  errorHandler(changeUserRole)
);

export default userRouter;
