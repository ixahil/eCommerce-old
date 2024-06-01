import { Router } from "express";
import {
  createNewOrder,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/index.js";

import { authenticate, authorizePermissions } from "../middlewares/index.js";
const router = Router();

// Public Routes

// Authorized Routes
router.get("/", authenticate, authorizePermissions(["ADMIN"]), getAllOrders);

router.post(
  "/create-new",
  authenticate,
  authorizePermissions(["USER", "ADMIN"]),
  createNewOrder
);

router.patch(
  "/order/update-status/:id",
  authenticate,
  authorizePermissions(["ADMIN"]),
  updateOrderStatus
);

// Authorized Routes

export { router };
