"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.ProductRoutes = router;
router.get("/", controllers_1.getProducts);
router.get("/:id", controllers_1.getProduct);
//# sourceMappingURL=Product.Routes.js.map