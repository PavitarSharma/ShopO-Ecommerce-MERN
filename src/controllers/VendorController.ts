import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { CreateProductInput } from "../dto";
import { Product, Vendor } from "../models";
import { findVendor } from "../services";
import { uploadImagesToCloudinary } from "../utils/Cloudinary";

export const getVendorProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const vendor = await Vendor.findById(req.user?._id).populate("products");

    if (!vendor) next(createError(404, "Customer not found."));

    res.status(200).json(vendor);
  }
);

export const AddProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      brand,
    } = <CreateProductInput>req.body;
    const vendor = await findVendor(req.user?._id);

    if (vendor !== null) {
      const files = req.files as [Express.Multer.File];

      const uploadedImages = await uploadImagesToCloudinary(files);

      res.json(uploadedImages);

      const product = await Product.create({
        name,
        description,
        category,
        originalPrice: +originalPrice,
        discountPrice: +discountPrice,
        stock: +stock,
        tags,
        images: uploadedImages,
        vendor: vendor._id,
        shop: {
          name: vendor.name,
          ownerName: vendor.ownerName,
          coverImage: vendor.coverImage,
          address: vendor.address,
          rating: vendor.rating,
        },
        brand
      });
      vendor.products.push(product);

      const result = await vendor.save();
      res.status(201).json(result);
    }
  }
);

export const getVendorProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({ vendor: req.user?._id }).populate({
      path: "vendor",
      select: "_id name email coverImage phone address",
    });

    if (products.length === 0)
      return next(createError("No product found with this vendor"));

    res.status(200).json(products);
  }
);
