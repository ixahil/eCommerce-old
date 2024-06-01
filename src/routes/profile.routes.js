import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/index.js";

import { authenticate, authorizePermissions } from "../middlewares/index.js";
import fileUpload from "express-fileupload";
const router = Router();

// Public Routes

// Authorized Routes
router.get(
  "/me",
  authenticate,
  authorizePermissions(["USER", "ADMIN"]),
  getProfile
);
router.patch(
  "/:id",
  authenticate,
  authorizePermissions(["USER", "ADMIN"]),
  fileUpload({ createParentPath: true }),
  updateProfile
);

// Authorized Routes

export { router };
