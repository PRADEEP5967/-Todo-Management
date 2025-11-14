"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const todoController_1 = require("../controllers/todoController");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
// Apply authentication middleware to all routes
router.use(auth_1.authenticateToken);
router.post('/', validation_1.validateTodo, todoController_1.createTodo);
router.get('/', todoController_1.getAllTodos);
router.get('/:id', todoController_1.getTodoById);
router.put('/:id', validation_1.validateTodo, todoController_1.updateTodo);
router.delete('/:id', todoController_1.deleteTodo);
router.patch('/:id/toggle', todoController_1.toggleTodoCompletion);
exports.default = router;
//# sourceMappingURL=todoRoutes.js.map