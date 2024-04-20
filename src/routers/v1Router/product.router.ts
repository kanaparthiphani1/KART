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

productRouter.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(createProduct)
);
productRouter.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(updateProduct)
);
productRouter.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteProduct)
);
productRouter.get(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(listProducts)
);
productRouter.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(getProductById)
);
productRouter.get("/search", [authMiddleware], errorHandler(searchProducts));

export default productRouter;
