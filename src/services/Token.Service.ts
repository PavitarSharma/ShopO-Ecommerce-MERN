import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXIRES,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXIRES,
  REFRESH_TOKEN_SECRET,
} from "../config";
import { AuthPayload } from "../dto";

export const generateSignature = async (payload: AuthPayload) => {
  const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXIRES,
  });

  const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXIRES,
  });

  return {
    access_token,
    refresh_token,
  };
};
