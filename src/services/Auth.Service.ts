import { UserPayload, VendorPayload } from "../dto";

export const getVendorPayload = (vendor: VendorPayload): VendorPayload => {
  const { _id, email, name, ownerName, role } = vendor;
  return {
    _id,
    email,
    name,
    ownerName,
    role,
  };
};

export const getUserPayload = (user: UserPayload): UserPayload => {
  const { _id, email, verified, role } = user;

  return {
    _id,
    email,
    verified: verified,
    role,
  };
};
