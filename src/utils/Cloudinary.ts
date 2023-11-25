import { v2 as cloudinary } from "cloudinary";
import {
  CLOUNINARY_API_KEY,
  CLOUNINARY_API_SECRET,
  CLOUNINARY_COULD_NAME,
} from "../config";

cloudinary.config({
  cloud_name: CLOUNINARY_COULD_NAME,
  api_key: CLOUNINARY_API_KEY,
  api_secret: CLOUNINARY_API_SECRET,
});

interface Image {
  id: string;
  url: string;
}

export const uploadImagesToCloudinary = async (
  images: Express.Multer.File[]
): Promise<Image[]> => {
  try {
    let uploadedImages: Image[] = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i].path, {
        folder: "shopo",
      });

      uploadedImages.push({
        id: result.public_id,
        url: result.secure_url,
      });
    }

    return uploadedImages;
  } catch (error) {
    console.error("Failed to upload images:", error);
    throw error;
  }
};

export const uploadImageToCloudinary = async (
  image: Express.Multer.File
): Promise<Image> => {
  try {
    const result = await cloudinary.uploader.upload(image.path, {
      folder: "shopo",
    });

    const uploadedImage = {
      id: result.public_id,
      url: result.secure_url,
    };
    return uploadedImage;
  } catch (error) {
    console.error("Failed to upload images:", error);
    throw error;
  }
};

export default cloudinary;
