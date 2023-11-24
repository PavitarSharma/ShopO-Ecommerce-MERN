import { Schema, model, Document } from "mongoose";

export interface ICategoryDoc extends Document {
  name: string;
  image?: string;
}

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

export const Category = model<ICategoryDoc>("Category", categorySchema);
