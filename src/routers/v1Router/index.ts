import { Router } from "express";
import authRouter from "./auth.router";
import productRouter from "./product.router";
import userRouter from "./user.router";
import cartRoutes from "./cart.router";
import orderRouter from "./order.router";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/product", productRouter);
v1Router.use("/user", userRouter);
v1Router.use("/cart", cartRoutes);
v1Router.use("/order", orderRouter);

export default v1Router;
