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
exports.DeleteCategory = exports.UpdateCategory = exports.GetCategoryById = exports.GetCategories = exports.CreateCategory = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const models_1 = require("../models");
const config_1 = require("../config");
exports.CreateCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const image = req.file;
    const category = yield models_1.Category.create({
        name,
        image: image ? image.filename : "",
    });
    res.status(201).json(category);
}));
exports.GetCategories = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield models_1.Category.find();
    if (categories.length === 0)
        return next((0, http_errors_1.default)("No category available"));
    res.status(200).json(categories);
}));
exports.GetCategoryById = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield models_1.Category.findById(req.params.id);
    if (!category)
        return next((0, http_errors_1.default)("No category available"));
    res.status(200).json(category);
}));
exports.UpdateCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const image = req.file;
    const uploadImage = `${config_1.BACKEND_URL}/${image === null || image === void 0 ? void 0 : image.filename}`;
    const category = yield models_1.Category.findByIdAndUpdate(req.params.id, {
        name,
        image: uploadImage,
    }, { new: true });
    //https://shopo-ecommerce.onrender.com
    if (!category)
        return next((0, http_errors_1.default)("No category available"));
    res.status(200).json(category);
}));
exports.DeleteCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield models_1.Category.findByIdAndRemove(req.params.id);
    if (!category)
        return next((0, http_errors_1.default)("No category available"));
    res.status(200).json(category);
}));
//# sourceMappingURL=CategoryController.js.map