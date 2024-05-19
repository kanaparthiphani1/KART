import { Router } from "express";
import { errorHandler } from "../../error-handler";
import authMiddleware from "../../middlewares/auth.middleware";
import {
  cancelOrder,
  changeStatus,
  createOrder,
  getOrderById,
  listAllOrders,
  listOrders,
  listUserOrders,
} from "../../controllers/order.controller";
import adminMiddleware from "../../middlewares/admin.middleware";

const orderRoutes: Router = Router();

//Create a new order
orderRoutes.post("/", [authMiddleware], errorHandler(createOrder));

//List user orders
orderRoutes.get("/", [authMiddleware], errorHandler(listOrders));

//Cancel the order
orderRoutes.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder));

//list all orders
orderRoutes.get(
  "/index",
  [authMiddleware, adminMiddleware],
  errorHandler(listAllOrders)
);

//list orders by user
orderRoutes.get(
  "/users/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(listUserOrders)
);

//change status of order
orderRoutes.put(
  "/:id/status",
  [authMiddleware, adminMiddleware],
  errorHandler(changeStatus)
);

//get order by id
orderRoutes.get("/:id", [authMiddleware], errorHandler(getOrderById));

export default orderRoutes;
