import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { LoginInputs, SignUpInputs, UserPayload, VendorPayload } from "../dto";
import {
  comparePassword,
  createUser,
  findUser,
  findVendor,
  generateSignature,
  getUserPayload,
  getVendorPayload,
  validatePassword,
} from "../services";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../config";

export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password } = <SignUpInputs>req.body;

    if (!name || !email || !password)
      return next(createError(400, "All fileds are required for sign up"));

    const existUser = await findUser("", email);
    if (existUser) return next(createError(409, "User already exists"));

    const hashPassword = await validatePassword(password);

    const user = await createUser({
      name,
      email,
      password: hashPassword,
      verified: true,
    });

    res.status(201).json(user);
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, userType } = <LoginInputs>req.body;

    if (!email || !password)
      return next(createError(400, "All fileds are required for login"));

    let user;

    if (userType === "Customer" || userType === "Admin") {
      user = await findUser("", email);
    } else {
      user = await findVendor("", email);
    }

    if (user === null) return next(createError(400, "Invalid credentials"));

    const validPassword = await comparePassword(user.password, password);
    if (!validPassword) return next(createError(400, "Invalid credentials"));

    let signature;

    if (userType === "Customer" || userType === "Admin") {
      const userPayload = getUserPayload(user as UserPayload);
      signature = await generateSignature(userPayload);
    } else {
      const vendorPayload = getVendorPayload(user as VendorPayload);
      signature = await generateSignature(vendorPayload);
    }

    const { access_token, refresh_token } = signature;
    res.cookie("shopoJWT", refresh_token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      access_token,
      user,
    });

   
  }
);

export const generateRefreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;

    if (!cookies?.shopoJWT) return next(createError(401, "Unauthorized"));

    const refreshToken = cookies.shopoJWT;
    const decoded = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    if (typeof decoded === "string") {
      // If the decoding returns a string, it means an error occurred
      return next(createError(401, "Unauthorized"));
    }

    const foundUser = await findUser(decoded._id);

    if (!foundUser) return next(createError(401, "Unauthorized"));

    const signature = await generateSignature({
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
      verified: foundUser.verified,
    });

    const { access_token } = signature;

    res.status(200).json({
      accessToken: access_token,
    });
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;

    if (!cookies?.shopoJWT) return next(createError(240, "No content"));

    res.clearCookie("shopoJWT", {
      httpOnly: true,
    });
    res.status(200).json({ message: "Logout successfully done." });
  }
);
