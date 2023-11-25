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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("../routes");
const http_errors_1 = __importDefault(require("http-errors"));
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use((0, cors_1.default)({
        origin: [
            "http://localhost:3000",
            "https://shopo-ecommerce.onrender.com",
            "https://shopo-ecommerce.netlify.app",
            "*",
        ],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    }));
    app.use("/", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.get("/", (req, res) => {
        res.json({
            success: true,
            message: "Hello from the shopo ecommerce backend",
        });
    });
    app.use("/auth", routes_1.AuthRoutes);
    app.use("/user", routes_1.UserRoutes);
    app.use("/admin", routes_1.AdminRoutes);
    app.use("/vendor", routes_1.VendorRoutes);
    app.use("/category", routes_1.categoryRoutes);
    app.use("/banner", routes_1.bannerRoutes);
    app.use("/products", routes_1.ProductRoutes);
    app.use("*", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        next(http_errors_1.default.NotFound());
    }));
    const errorHandler = (err, req, res, next) => {
        res.status(err.status || 500);
        res.send({
            status: err.status || 500,
            message: err.message,
        });
    };
    app.use(errorHandler);
    return app;
});
//# sourceMappingURL=ExpressApp.js.map