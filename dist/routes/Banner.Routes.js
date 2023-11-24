"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const BannerController_1 = require("../controllers/BannerController");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
exports.bannerRoutes = router;
router.post("/", middlewares_1.upload.single("image"), BannerController_1.CreateBanner);
router.get("/", BannerController_1.GetBanners);
router.get("/:id", BannerController_1.GetBannerById);
router.patch("/:id", middlewares_1.upload.single("image"), BannerController_1.UpdateBanner);
router.delete("/:id", BannerController_1.DeleteBanner);
//# sourceMappingURL=Banner.Routes.js.map