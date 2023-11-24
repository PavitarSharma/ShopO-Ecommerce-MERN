import mongoose, { Schema, Document, Model } from "mongoose";
import { VendorDoc, UserDoc } from ".";

interface ProductDoc extends Document {
  name: string;
  description: string;
  category: string;
  tags: string;
  originalPrice: number;
  discountPrice: number;
  stock: number;
  images: [string];
  ratings?: number;
  vendorId: string;
  reviews: {
    user: UserDoc;
    rating: number;
    comment: string;
    productId: string;
    createdAt: Date;
  }[];
  shop: VendorDoc;
  sold_out: number;
  createdAt: Date;
}

const productSchema = new Schema<ProductDoc>({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  images: [{ type: String }],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  ratings: {
    type: Number,
  },
  vendorId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model<ProductDoc>(
  "Product",
  productSchema
);
