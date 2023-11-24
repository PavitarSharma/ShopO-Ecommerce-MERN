"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.AdminRoutes = router;
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello from admin routes",
    });
});
router.post("/vendor", middlewares_1.upload.single("image"), controllers_1.CreateVendor);
router.get("/vendors", controllers_1.GetVendors);
router.get("/vendor/:id", controllers_1.GetVendorById);
router.delete("/vendor/:id", controllers_1.DeleteVendorById);
//# sourceMappingURL=Admin.Routes.js.map