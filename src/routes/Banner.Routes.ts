import express from "express";
import {
  CreateBanner,
  DeleteBanner,
  GetBannerById,
  GetBanners,
  UpdateBanner,
} from "../controllers/BannerController";
import { upload } from "../middlewares";

const router = express.Router();

router.post("/", upload.single("image"), CreateBanner);

router.get("/", GetBanners);

router.get("/:id", GetBannerById);

router.patch("/:id", upload.single("image"), UpdateBanner);

router.delete("/:id", DeleteBanner);

export { router as bannerRoutes };
