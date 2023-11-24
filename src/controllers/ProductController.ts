import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { Product } from "../models";

export const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find().populate({
      path: "vendor",
      select: "_id name email coverImage phone address",
    });

    if (products.length === 0)
      return next(createError("No product found with this vendor"));

    res.status(200).json(products);
  }
);

export const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id).populate({
      path: "vendor",
      select: "_id name email coverImage phone address",
    });

    if (product === null) return next(createError("No product found"));

    res.status(200).json(product);
  }
);
