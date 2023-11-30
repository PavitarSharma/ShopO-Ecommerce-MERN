export type Category = {
  _id: string;
  name: string;
  image: {
    id: string;
    url: string;
  };
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
  phone?: number;
  addresses: IAddress[];
  createdAt: Date;
  updatedAt: Date;
  lat?: number;
  lng?: number;
  wishlists: unknown[];
  cart: [unknown];
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

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  tags: string;
  originalPrice: number;
  discountPrice: number;
  stock: number;
  images: [{ id: string; url: string }];
  vendor: string;
  shop: {
    name: string;
    ownerName: string;
    coverImage: string;
    address: string;
    rating: number;
  };
  brand: string;
  sold_out: number;
  reviews: number[];
  createdAt: string;
  isFavorite?: boolean;
  __v?: number;
}

export interface CartItem {
  product: Product;
  unit: number;
  _id: string;
}
