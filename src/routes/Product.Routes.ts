import express, { Request, Response } from "express";
import { getProduct, getProducts } from "../controllers";

const router = express.Router();



router.get("/", getProducts);
router.get("/:id", getProduct);

export { router as ProductRoutes };
