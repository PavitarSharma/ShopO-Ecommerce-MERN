import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { Category } from "../models";
import { uploadImageToCloudinary } from "../utils";

export const CreateCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const image = req.file as Express.Multer.File;
    const uploadImage = await uploadImageToCloudinary(image);

    const category = await Category.create({
      name,
      image: uploadImage,
    });

    res.status(201).json(category);
  }
);

export const GetCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find();

    if (categories.length === 0)
      return next(createError("No category available"));

    res.status(200).json(categories);
  }
);

export const GetCategoryById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findById(req.params.id);

    if (!category) return next(createError("No category available"));

    res.status(200).json(category);
  }
);

export const UpdateCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;

    const image = req.file as Express.Multer.File;
    const uploadImage = await uploadImageToCloudinary(image);

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        image: uploadImage,
      },
      { new: true }
    );
    //https://shopo-ecommerce.onrender.com
    if (!category) return next(createError("No category available"));

    res.status(200).json(category);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json(error.message)
      
    }
  }
);

export const DeleteCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) return next(createError("No category available"));

    res.status(200).json(category);
  }
);
