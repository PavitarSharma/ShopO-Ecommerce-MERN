"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.AuthRoutes = router;
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello from auth routes",
    });
});
router.post("/sign-up", controllers_1.signUp);
router.post("/login", controllers_1.login);
router.get("/refresh", controllers_1.generateRefreshToken);
router.post("/logout", middlewares_1.Authenticate, controllers_1.logout);
//# sourceMappingURL=Auth.Routes.js.map