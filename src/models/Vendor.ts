import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";

export interface VendorDoc extends Document {
  name: string;
  ownerName: string;
  description: string;
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  coverImage: string;
  rating: number;
  products: any;
  lat: number;
  lng: number;
  resetPasswordToken?: string;
  resetPasswordTime?: Date;
  role: string;
}

const vendorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trime: true,
    },
    ownerName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email."],
      trim: true,
    },
    description: { type: String },
    pincode: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    coverImage: {
      type: String,
      default: "",
    },
    rating: Number,
    role: {
      type: String,
      default: "Vendor",
    },

    products: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product",
      },
    ],
    lat: { type: Number },
    lng: { type: Number },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },

  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Vendor = mongoose.model<VendorDoc>("Vendor", vendorSchema);

export { Vendor };
