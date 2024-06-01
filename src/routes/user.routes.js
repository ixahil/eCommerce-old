import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAUser,
  verifyEmail,
  resendEmailVerification,
  getAllUsers,
  logoutUser,
  updateUserDetails,
  updatePassword,
  updateAccount,
  deleteAccount,
} from "../controllers/index.js";
import { authenticate, authorizePermissions } from "../middlewares/index.js";
import fileUpload from "express-fileupload";
import { updateUserStatus } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:verificationToken", verifyEmail);
router.get("/resend-email-verification", authenticate, resendEmailVerification);

// Authorized Routes
router.get(
  "/me",
  authenticate,
  authorizePermissions(["USER", "ADMIN"]),
  getAUser
);

router.get(
  "/logout",
  authenticate,
  authorizePermissions(["USER", "ADMIN"]),
  logoutUser
);
router.patch(
  "/user/update-status/:id",
  authenticate,
  authorizePermissions(["ADMIN"]),
  updateUserStatus
);

router.get("/", authenticate, authorizePermissions(["ADMIN"]), getAllUsers);

router.put(
  "/:id",
  authenticate,
  authorizePermissions(["USER", "ADMIN"]),
  fileUpload({ createParentPath: true }),
  updateUserDetails
);

router.patch(
  "/update-password",
  authenticate,
  authorizePermissions(["USER", "ADMIN"]),
  updatePassword
);

router.patch(
  "/update-account",
  authenticate,
  authorizePermissions(["USER", "ADMIN"]),
  updateAccount
);

router.delete(
  "/delete-account",
  authenticate,
  authorizePermissions(["USER", "ADMIN"]),
  deleteAccount
);

export { router };
