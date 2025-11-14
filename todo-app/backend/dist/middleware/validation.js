"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTodo = exports.validateSignin = exports.validateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const validateSignup = (req, res, next) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().min(3).max(30).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.validateSignup = validateSignup;
const validateSignin = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.validateSignin = validateSignin;
const validateTodo = (req, res, next) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(1).max(255).required(),
        description: joi_1.default.string().allow('').optional()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.validateTodo = validateTodo;
//# sourceMappingURL=validation.js.map