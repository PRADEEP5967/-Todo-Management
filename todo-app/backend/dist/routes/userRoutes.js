"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/signup', validation_1.validateSignup, userController_1.signup);
router.post('/signin', validation_1.validateSignin, userController_1.signin);
router.post('/forgot-password', userController_1.forgotPassword);
router.post('/reset-password', userController_1.resetPassword);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map