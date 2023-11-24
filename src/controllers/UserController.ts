import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { findUser } from "../services";

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await findUser(req.user?._id as string);

    if (!user) next(createError(404, "Customer not found."));

    res.status(200).json(user);
  }
);
