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
exports.logout = exports.generateRefreshToken = exports.login = exports.signUp = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const services_1 = require("../services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
exports.signUp = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    if (!name || !email || !password)
        return next((0, http_errors_1.default)(400, "All fileds are required for sign up"));
    const existUser = yield (0, services_1.findUser)("", email);
    if (existUser)
        return next((0, http_errors_1.default)(409, "User already exists"));
    const hashPassword = yield (0, services_1.validatePassword)(password);
    const user = yield (0, services_1.createUser)({
        name,
        email,
        password: hashPassword,
        verified: true,
    });
    res.status(201).json(user);
}));
exports.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, userType } = req.body;
    if (!email || !password)
        return next((0, http_errors_1.default)(400, "All fileds are required for login"));
    let user;
    if (userType === "Customer" || userType === "Admin") {
        user = yield (0, services_1.findUser)("", email);
    }
    else {
        user = yield (0, services_1.findVendor)("", email);
    }
    if (user === null)
        return next((0, http_errors_1.default)(400, "Invalid credentials"));
    const validPassword = yield (0, services_1.comparePassword)(user.password, password);
    if (!validPassword)
        return next((0, http_errors_1.default)(400, "Invalid credentials"));
    let signature;
    if (userType === "Customer" || userType === "Admin") {
        const userPayload = (0, services_1.getUserPayload)(user);
        signature = yield (0, services_1.generateSignature)(userPayload);
    }
    else {
        const vendorPayload = (0, services_1.getVendorPayload)(user);
        signature = yield (0, services_1.generateSignature)(vendorPayload);
    }
    const { access_token, refresh_token } = signature;
    res.cookie("shopoJWT", refresh_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
        access_token,
        user,
    });
}));
exports.generateRefreshToken = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.shopoJWT))
        return next((0, http_errors_1.default)(401, "Unauthorized"));
    const refreshToken = cookies.shopoJWT;
    const decoded = yield jsonwebtoken_1.default.verify(refreshToken, config_1.REFRESH_TOKEN_SECRET);
    if (typeof decoded === "string") {
        // If the decoding returns a string, it means an error occurred
        return next((0, http_errors_1.default)(401, "Unauthorized"));
    }
    const foundUser = yield (0, services_1.findUser)(decoded._id);
    if (!foundUser)
        return next((0, http_errors_1.default)(401, "Unauthorized"));
    const signature = yield (0, services_1.generateSignature)({
        _id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role,
        verified: foundUser.verified,
    });
    const { access_token } = signature;
    res.status(200).json({
        accessToken: access_token,
    });
}));
exports.logout = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.shopoJWT))
        return next((0, http_errors_1.default)(240, "No content"));
    res.clearCookie("shopoJWT", {
        httpOnly: true,
    });
    res.status(200).json({ message: "Logout successfully done." });
}));
//# sourceMappingURL=AuthController.js.map