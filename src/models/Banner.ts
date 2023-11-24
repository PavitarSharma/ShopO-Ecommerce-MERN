import mongoose, { Schema, Document } from "mongoose";

interface BannerDoc extends Document {
  title: string;
  description: string;
  image: string;
}

const bannerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Banner = mongoose.model<BannerDoc>("Bannner", bannerSchema);

export { Banner };
