import { Schema, model, Document } from "mongoose";

export interface ICategoryDoc extends Document {
  name: string;
  image: {
    id: string;
    url: string;
  };
}

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: { id: String, url: String },
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
