import express, { Request, Response } from "express";

import { Authenticate, upload } from "../middlewares";
import { getVendorProfile } from "../controllers";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hello from vendor routes",
  });
});

router.use(Authenticate);
router.get("/profile", getVendorProfile);

// router.post("/product", upload.array("images", 10), AddProduct);

export { router as VendorRoutes };
