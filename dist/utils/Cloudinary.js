"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToCloudinary = exports.uploadImagesToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("../config");
cloudinary_1.v2.config({
    cloud_name: config_1.CLOUNINARY_COULD_NAME,
    api_key: config_1.CLOUNINARY_API_KEY,
    api_secret: config_1.CLOUNINARY_API_SECRET,
});
const uploadImagesToCloudinary = (images) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uploadedImages = [];
        for (let i = 0; i < images.length; i++) {
            const result = yield cloudinary_1.v2.uploader.upload(images[i].path, {
                folder: "shopo",
            });
            uploadedImages.push({
                id: result.public_id,
                url: result.secure_url,
            });
        }
        return uploadedImages;
    }
    catch (error) {
        console.error("Failed to upload images:", error);
        throw error;
    }
});
exports.uploadImagesToCloudinary = uploadImagesToCloudinary;
const uploadImageToCloudinary = (image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.v2.uploader.upload(image.path, {
            folder: "shopo",
        });
        const uploadedImage = {
            id: result.public_id,
            url: result.secure_url,
        };
        return uploadedImage;
    }
    catch (error) {
        console.error("Failed to upload images:", error);
        throw error;
    }
});
exports.uploadImageToCloudinary = uploadImageToCloudinary;
exports.default = cloudinary_1.v2;
//# sourceMappingURL=Cloudinary.js.map