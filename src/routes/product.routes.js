import { Router } from "express";
import {
  createNewProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getAProduct,
  getProductsByCollection,
  updateProductStatus,
} from "../controllers/index.js";

import { authenticate, authorizePermissions } from "../middlewares/index.js";
import { upload } from "../middlewares/index.js";
import fileUpload from "express-fileupload";

const router = Router();

// Public Routes
router.get("/", getProducts);
router.get("/:collection", getProductsByCollection);

router.get("/product/:sku", getAProduct);

// Authorized Routes
router.post(
  "/create-new",
  authenticate,
  authorizePermissions(["ADMIN"]),
  fileUpload({ createParentPath: true }),
  createNewProduct
);

router.post("/upload-images/:sku");

router.patch(
  "/product/:sku",
  authenticate,
  authorizePermissions(["ADMIN"]),
  fileUpload({ createParentPath: true }),
  editProduct
);

router.patch("/product/update-status/:sku", updateProductStatus);
router.delete(
  "/product/:sku",

  deleteProduct
);

// Authorized Routes

export { router };
