import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;


  const authHeaderString = Array.isArray(authHeader)
    ? authHeader[0]
    : authHeader;

  if (!authHeaderString?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeaderString.split(" ")[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    req.user = decoded as AuthPayload;
    next();
  });
};
