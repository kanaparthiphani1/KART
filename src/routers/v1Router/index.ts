import { Router } from "express";
import authRouter from "./auth.router";
import productRouter from "./product.router";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/product", productRouter);

export default v1Router;
