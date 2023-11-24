"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const CategoryController_1 = require("../controllers/CategoryController");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
exports.categoryRoutes = router;
router.post("/", middlewares_1.upload.single("image"), CategoryController_1.CreateCategory);
router.get("/", CategoryController_1.GetCategories);
router.get("/:id", CategoryController_1.GetCategoryById);
router.patch("/:id", middlewares_1.upload.single("image"), CategoryController_1.UpdateCategory);
router.delete("/:id", CategoryController_1.DeleteCategory);
//# sourceMappingURL=Category.Routes.js.map