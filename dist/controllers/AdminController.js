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
exports.DeleteVendorById = exports.GetVendorById = exports.GetVendors = exports.CreateVendor = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const services_1 = require("../services");
const models_1 = require("../models");
exports.CreateVendor = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, pincode, email, password, ownerName, phone, lat, lng, } = req.body;
    const image = req.file;
    if (!email ||
        !password ||
        !name ||
        !pincode ||
        !ownerName ||
        !phone ||
        !address)
        return next((0, http_errors_1.default)(400, "All fileds are required."));
    const existingVendor = yield (0, services_1.findVendor)("", email);
    if (existingVendor !== null)
        return next((0, http_errors_1.default)(400, "A vendor is exist with this email ID"));
    const hashPassword = yield (0, services_1.validatePassword)(password);
    const createVendor = yield (0, services_1.addVendor)({
        name,
        email,
        address,
        phone,
        pincode,
        password: hashPassword,
        ownerName,
        lat: lat || 0,
        lng: lng || 0,
        image: (image === null || image === void 0 ? void 0 : image.filename) || ""
    });
    res.status(200).json(createVendor);
}));
exports.GetVendors = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vendors = yield models_1.Vendor.find();
    if (vendors.length === 0) {
        return next((0, http_errors_1.default)(400, "Vendors does not available"));
    }
    res.status(200).json(vendors);
}));
exports.GetVendorById = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vendor = yield (0, services_1.findVendor)(id);
    if (!vendor) {
        return next((0, http_errors_1.default)(404, "Vendor does not available"));
    }
    res.status(200).json(vendor);
}));
exports.DeleteVendorById = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vendor = yield models_1.Vendor.findByIdAndRemove(id);
    if (!vendor) {
        return next((0, http_errors_1.default)(404, "Vendor does not available"));
    }
    res.status(200).json(vendor);
}));
//# sourceMappingURL=AdminController.js.map