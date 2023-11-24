import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

import { CreateProductInput } from "../dto";
import { Product, Vendor } from "../models";
import { findVendor } from "../services";

export const getVendorProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const vendor = await findVendor(req.user?._id as string);

    if (!vendor) next(createError(404, "Customer not found."));

    res.status(200).json(vendor);
  }
);
// export const AddProduct = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user;

//     const {
//       name,
//       description,
//       category,
//       tags,
//       originalPrice,
//       discountPrice,
//       stock,
//     } = <CreateProductInput>req.body;
//     const vendor = await vendorService.findVendor(user?._id);

//     if (vendor !== null) {
//       const files = req.files as [Express.Multer.File];
//       const images = files.map((file: Express.Multer.File) => file.filename);

//       const product = await Product.create({
//         name,
//         description,
//         category,
//         originalPrice: +originalPrice,
//         discountPrice: +discountPrice,
//         stock: +stock,
//         tags,
//         images,
//         vendorId: vendor._id,
//         shop: {
//           name: vendor.name,
//           ownerName: vendor.ownerName,
//           coverImage: vendor.coverImage,
//           address: vendor.address,
//           rating: vendor.rating,
//         },
//       });
//       vendor.products.push(product);

//       const result = await vendor.save();
//       res.status(201).json(result);
//     }
//   }
// );
