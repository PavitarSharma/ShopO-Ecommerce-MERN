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
exports.addVendor = exports.findVendor = void 0;
const Vendor_1 = require("../models/Vendor");
const findVendor = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield Vendor_1.Vendor.findOne({ email: email });
    }
    else {
        return yield Vendor_1.Vendor.findById(id);
    }
});
exports.findVendor = findVendor;
const addVendor = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, pincode, email, password, ownerName, phone, lat, lng, image, } = body;
    return yield Vendor_1.Vendor.create({
        name,
        ownerName,
        email,
        password,
        phone,
        address,
        pincode,
        products: [],
        lat,
        lng,
        rating: 0,
        coverImage: image,
    });
});
exports.addVendor = addVendor;
//# sourceMappingURL=Vendor.Service.js.map