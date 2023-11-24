import { CreateVendorInput } from "../dto/Vendor.dto";
import { Vendor } from "../models/Vendor";

export const findVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vendor.findOne({ email: email });
  } else {
    return await Vendor.findById(id);
  }
};

export const addVendor = async (body: any) => {
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
    image,
  } = body;
  return await Vendor.create({
    name,
    ownerName,
    email,
    password,
    phone,
    address,
    pincode,
    products: [],
    lat,
    lng,
    rating: 0,
    coverImage: image,
  });
};
