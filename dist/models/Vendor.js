"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendor = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const vendorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trime: true,
    },
    ownerName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator_1.default.isEmail, "Please enter a valid email."],
        trim: true,
    },
    description: { type: String },
    pincode: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    coverImage: {
        type: String,
        default: "",
    },
    rating: Number,
    role: {
        type: String,
        default: "Vendor",
    },
    products: [
        {
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: "Product",
        },
    ],
    lat: { type: Number },
    lng: { type: Number },
    resetPasswordToken: String,
    resetPasswordTime: Date,
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        },
    },
    timestamps: true,
});
const Vendor = mongoose_1.default.model("Vendor", vendorSchema);
exports.Vendor = Vendor;
//# sourceMappingURL=Vendor.js.map