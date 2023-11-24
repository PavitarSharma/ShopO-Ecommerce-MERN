"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.VendorRoutes = router;
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello from vendor routes",
    });
});
router.use(middlewares_1.Authenticate);
router.get("/profile", controllers_1.getVendorProfile);
router.post("/product", middlewares_1.upload.array("images", 10), controllers_1.AddProduct);
router.get("/products", controllers_1.getVendorProducts);
//# sourceMappingURL=Vendor.Routes.js.map