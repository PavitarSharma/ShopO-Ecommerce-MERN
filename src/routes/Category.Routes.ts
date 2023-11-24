import express from "express";
import {
  CreateCategory,
  DeleteCategory,
  GetCategories,
  GetCategoryById,
  UpdateCategory,
} from "../controllers/CategoryController";
import { upload } from "../middlewares";

const router = express.Router();

router.post("/", upload.single("image"), CreateCategory);

router.get("/", GetCategories);

router.get("/:id", GetCategoryById);

router.patch("/:id", upload.single("image"), UpdateCategory);

router.delete("/:id", DeleteCategory);

export { router as categoryRoutes };
