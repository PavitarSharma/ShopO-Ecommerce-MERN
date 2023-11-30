import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { findUser } from "../services";
import { User } from "../models";

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?._id as string).populate(
      "wishlists"
    ).populate("cart.product")

    if (!user) next(createError(404, "Customer not found."));

    res.status(200).json(user);
  }
);
