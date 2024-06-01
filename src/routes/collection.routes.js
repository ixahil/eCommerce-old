import { Router } from "express";
import { getCollections, getACollection } from "../controllers/index.js";
import { authenticate, authorizePermissions } from "../middlewares/index.js";
import fileUpload from "express-fileupload";

const router = Router();

router.get("/", getCollections);
router.get("/:collection", getACollection);

export { router };
