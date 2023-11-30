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
  images: [{ id: string; url: string }];
  ratings?: number;
  vendor: string | Schema.Types.ObjectId;
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
  brand: string;
  isFavorite: boolean;
}

const productSchema = new Schema<ProductDoc>(
  {
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
    brand: String,
    images: [{ id: String, url: String }],
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
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    isFavorite: {
      type: Boolean,
      default: false,
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
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

export const Product = mongoose.model<ProductDoc>("Product", productSchema);
