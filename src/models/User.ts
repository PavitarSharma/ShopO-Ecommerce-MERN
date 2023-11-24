import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

interface IAddress {
  country?: string;
  city?: string;
  state?: string;
  address1?: string;
  address2?: string;
  zipCode?: number;
  addressType?: string;
}

export interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  phone: number;
  addresses: IAddress[];
  role: string;
  avatar: string;
  resetPasswordToken?: string;
  resetPasswordTime?: Date;
  verified: boolean;
  otp: number;
  otp_expiry: Date;
  lat: number;
  lng: number;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email."],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "Password should be greater than 8 characters"],
    },

    phone: Number,

    addresses: [
      {
        country: {
          type: String,
        },

        state: {
          type: String,
        },

        city: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        zipCode: {
          type: Number,
        },
        addressType: {
          type: String,
        },
      },
    ],

    otp: { type: Number },
    otp_expiry: { type: Date },

    lat: { type: Number },
    lng: { type: Number },

    role: {
      type: String,
      default: "Customer",
    },
    verified: {
      type: Boolean,
      default: false
    },

    avatar: String,

    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.otp_expiry
        delete ret.otp
        delete ret.resetPasswordToken
        delete ret.resetPasswordTime
        // delete ret.createdAt;
        // delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const User = mongoose.model<UserDoc>("User", userSchema);

export { User };
