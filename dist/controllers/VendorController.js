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
exports.getVendorProfile = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const services_1 = require("../services");
exports.getVendorProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const vendor = yield (0, services_1.findVendor)((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!vendor)
        next((0, http_errors_1.default)(404, "Customer not found."));
    res.status(200).json(vendor);
}));
// export const AddProduct = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user;
//     const {
//       name,
//       description,
//       category,
//       tags,
//       originalPrice,
//       discountPrice,
//       stock,
//     } = <CreateProductInput>req.body;
//     const vendor = await vendorService.findVendor(user?._id);
//     if (vendor !== null) {
//       const files = req.files as [Express.Multer.File];
//       const images = files.map((file: Express.Multer.File) => file.filename);
//       const product = await Product.create({
//         name,
//         description,
//         category,
//         originalPrice: +originalPrice,
//         discountPrice: +discountPrice,
//         stock: +stock,
//         tags,
//         images,
//         vendorId: vendor._id,
//         shop: {
//           name: vendor.name,
//           ownerName: vendor.ownerName,
//           coverImage: vendor.coverImage,
//           address: vendor.address,
//           rating: vendor.rating,
//         },
//       });
//       vendor.products.push(product);
//       const result = await vendor.save();
//       res.status(201).json(result);
//     }
//   }
// );
//# sourceMappingURL=VendorController.js.map