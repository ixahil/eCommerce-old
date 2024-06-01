import { Router } from "express";
import { getABrand, getBrands } from "../controllers/index.js";

const router = Router();

router.get("/", getBrands);
router.get("/:brand", getABrand);

export { router };
