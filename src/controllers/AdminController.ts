import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { CreateVendorInput } from "../dto/Vendor.dto";
import { addVendor, findVendor, validatePassword} from "../services";
import { Vendor } from "../models";

export const CreateVendor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      address,
      pincode,
      email,
      password,
      ownerName,
      phone,
      lat,
      lng,
    } = <CreateVendorInput>req.body;

    const image = req.file;

    if (
      !email ||
      !password ||
      !name ||
      !pincode ||
      !ownerName ||
      !phone ||
      !address
    )
      return next(createError(400, "All fileds are required."));

    const existingVendor = await findVendor("", email);

    if (existingVendor !== null)
      return next(createError(400, "A vendor is exist with this email ID"));

      const hashPassword = await validatePassword(password);

    const createVendor = await addVendor({
      name,
      email,
      address,
      phone,
      pincode,
      password: hashPassword,
      ownerName,
      lat: lat as number || 0,
      lng: lng as number || 0,
      image: image?.filename || ""
    });

    res.status(200).json(createVendor);
  }
);

export const GetVendors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const vendors = await Vendor.find();

    if (vendors.length === 0) {
      return next(createError(400, "Vendors does not available"));
    }

    res.status(200).json(vendors);
  }
);

export const GetVendorById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const vendor = await findVendor(id);

    if (!vendor) {
      return next(createError(404, "Vendor does not available"));
    }

    res.status(200).json(vendor);
  }
);

export const DeleteVendorById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const vendor = await Vendor.findByIdAndRemove(id);

    if (!vendor) {
      return next(createError(404, "Vendor does not available"));
    }

    res.status(200).json(vendor);
  }
);
