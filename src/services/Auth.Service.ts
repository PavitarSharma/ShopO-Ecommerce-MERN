import { UserPayload, VendorPayload } from "../dto";

export const getVendorPayload = (vendor: VendorPayload): VendorPayload => {
  const { _id, email, role } = vendor;
  return {
    _id,
    email,
    role,
  };
};

export const getUserPayload = (user: UserPayload): UserPayload => {
  const { _id, email, role } = user;

  return {
    _id,
    email,
    role,
  };
};
