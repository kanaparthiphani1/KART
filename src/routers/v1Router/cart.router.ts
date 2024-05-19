import { Router } from "express";
import { errorHandler } from "../../error-handler";
import authMiddleware from "../../middlewares/auth.middleware";
import {
  addItemToCart,
  changeQuantity,
  deleteItemFromCart,
  getCart,
} from "../../controllers/cart.controller";

const cartRoutes: Router = Router();
//Add to cart
cartRoutes.post("/", [authMiddleware], errorHandler(addItemToCart));

//Get Cart
cartRoutes.get("/", [authMiddleware], errorHandler(getCart));

//Delete Item from Cart
cartRoutes.delete("/:id", [authMiddleware], errorHandler(deleteItemFromCart));

//Change Quantity of Item in Cart
cartRoutes.put("/:id", [authMiddleware], errorHandler(changeQuantity));

export default cartRoutes;
