import express, { Request, Response } from "express";

import { upload } from "../middlewares";
import {
  CreateVendor,
  DeleteVendorById,
  GetVendorById,
  GetVendors,
} from "../controllers";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hello from admin routes",
  });
});

router.post("/vendor",upload.single("image"), CreateVendor);

router.get("/vendors", GetVendors);

router.get("/vendor/:id", GetVendorById);

router.delete("/vendor/:id", DeleteVendorById);

export { router as AdminRoutes };
