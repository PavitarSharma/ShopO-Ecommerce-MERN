import { config } from "dotenv";
config();

export const MONGO_URI = process.env.MONGO_URI as string;

export const NODE_ENV = process.env.NODE_ENV as string;

export const CLIENT_URL = process.env.CLIENT_URL as string;

export const BACKEND_URL = process.env.BACKEND_URL as string;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const ACCESS_TOKEN_EXIRES = process.env.ACCESS_TOKEN_EXIRES as string;

export const REFRESH_TOKEN_EXIRES = process.env.REFRESH_TOKEN_EXIRES as string;

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const ACTIVATION_SECRET = process.env.ACTIVATION_SECRET as string;

export const EMAIL_TOKEN_SECRET = process.env.EMAIL_TOKEN_SECRET as string;

export const JWT_EXPIRES = process.env.JWT_EXPIRES as string;

export const SMPT_MAIL = process.env.SMPT_MAIL as string;

export const SMPT_PASSWORD = process.env.SMPT_PASSWORD as string;

export const SMPT_HOST = process.env.SMPT_HOST as string;

export const SMPT_PORT = process.env.SMPT_PORT as string;

export const SMPT_SERVICE = process.env.SMPT_SERVICE as string;

export const PORT = process.env.PORT || 8000;

export const CLOUNINARY_COULD_NAME = process.env.CLOUNINARY_COULD_NAME as string

export const CLOUNINARY_API_KEY = process.env.CLOUNINARY_API_KEY as string

export const CLOUNINARY_API_SECRET = process.env.CLOUNINARY_API_SECRET as string
