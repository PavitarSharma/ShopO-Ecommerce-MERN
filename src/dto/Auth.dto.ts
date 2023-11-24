import { UserPayload } from "./User.dto";
import { VendorPayload } from "./Vendor.dto";

export interface SignUpInputs {
  name: string;
  email: string;
  password: string;
}

export interface LoginInputs {
  email: string;
  password: string;
  userType: string
}

export interface ResetPasswordInputs {
  newPassword: string;
  confirmPassword: string;
}

export type AuthPayload = UserPayload | VendorPayload;
