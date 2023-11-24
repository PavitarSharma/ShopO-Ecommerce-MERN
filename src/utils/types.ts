export type Category = {
  _id: string;
  name: string;
  image: string;
};

export interface IAddress {
  country?: string;
  city?: string;
  state?: string;
  address1?: string;
  address2?: string;
  zipCode?: number;
  addressType?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  avatar?: string;
  phone?: number ;
  addresses: IAddress[];
  createdAt: Date;
  updatedAt: Date;
  lat?: number;
  lng?: number;
}

export interface IVendor {
  _id: string;
  name: string;
  role: string;
  ownerName: string;
  email: string;
  pincode: string;
  address: string;
  phone: string;
  coverImage: string;
  rating: number;
  products: unknown[];
  lat: number;
  lng: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  description: string;
}
