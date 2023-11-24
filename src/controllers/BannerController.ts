import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

export const CreateBanner = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const GetBanners = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const GetBannerById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const UpdateBanner = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const DeleteBanner = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
