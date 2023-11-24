import express, { Request, Response } from "express";

import { Authenticate } from "../middlewares";
import { generateRefreshToken, login, logout, signUp } from "../controllers";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hello from auth routes",
  });
});

router.post("/sign-up", signUp);
router.post("/login", login);
router.get("/refresh", generateRefreshToken);
router.post("/logout", Authenticate, logout);

export { router as AuthRoutes };
