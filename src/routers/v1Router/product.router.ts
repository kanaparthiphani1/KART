import { errorHandler } from "./../../error-handler";
import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  searchProducts,
  updateProduct,
} from "../../controllers/product.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import adminMiddleware from "../../middlewares/admin.middleware";

const productRouter = Router();

//search products
productRouter.get("/search", [authMiddleware], errorHandler(searchProducts));

//Create a new product
productRouter.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(createProduct)
);

//Get all products
productRouter.get(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(listProducts)
);

//get product by id
productRouter.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(getProductById)
);

//update product by id
productRouter.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(updateProduct)
);

//delete product by id
productRouter.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteProduct)
);

export default productRouter;
