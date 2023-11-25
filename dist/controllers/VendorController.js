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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorProducts = exports.AddProduct = exports.getVendorProfile = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const models_1 = require("../models");
const services_1 = require("../services");
const Cloudinary_1 = require("../utils/Cloudinary");
exports.getVendorProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const vendor = yield models_1.Vendor.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).populate("products");
    if (!vendor)
        next((0, http_errors_1.default)(404, "Customer not found."));
    res.status(200).json(vendor);
}));
exports.AddProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { name, description, category, tags, originalPrice, discountPrice, stock, brand, } = req.body;
    const vendor = yield (0, services_1.findVendor)((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
    if (vendor !== null) {
        const files = req.files;
        const uploadedImages = yield (0, Cloudinary_1.uploadImagesToCloudinary)(files);
        res.json(uploadedImages);
        const product = yield models_1.Product.create({
            name,
            description,
            category,
            originalPrice: +originalPrice,
            discountPrice: +discountPrice,
            stock: +stock,
            tags,
            images: uploadedImages,
            vendor: vendor._id,
            shop: {
                name: vendor.name,
                ownerName: vendor.ownerName,
                coverImage: vendor.coverImage,
                address: vendor.address,
                rating: vendor.rating,
            },
            brand
        });
        vendor.products.push(product);
        const result = yield vendor.save();
        res.status(201).json(result);
    }
}));
exports.getVendorProducts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const products = yield models_1.Product.find({ vendor: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id }).populate({
        path: "vendor",
        select: "_id name email coverImage phone address",
    });
    if (products.length === 0)
        return next((0, http_errors_1.default)("No product found with this vendor"));
    res.status(200).json(products);
}));
//# sourceMappingURL=VendorController.js.map