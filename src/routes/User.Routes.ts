import express, { Request, Response } from "express";

import { Authenticate, upload } from "../middlewares";
import { getUserProfile } from "../controllers";


const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hello from user routes",
  });
});

router.use(Authenticate);

router.get("/profile", getUserProfile)



export { router as UserRoutes };
