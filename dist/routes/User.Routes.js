"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.UserRoutes = router;
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello from user routes",
    });
});
router.use(middlewares_1.Authenticate);
router.get("/profile", controllers_1.getUserProfile);
//# sourceMappingURL=User.Routes.js.map