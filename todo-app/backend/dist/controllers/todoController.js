"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTodoCompletion = exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.getAllTodos = exports.createTodo = void 0;
const db_1 = require("../utils/db");
const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const user = req.user;
        const result = await (0, db_1.query)('INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *', [user.id, title, description]);
        const todo = result.rows[0];
        res.status(201).json({ message: 'Todo created successfully', todo });
    }
    catch (error) {
        console.error('Create todo error:', error);
        logError('Create todo error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createTodo = createTodo;
const getAllTodos = async (req, res) => {
    try {
        const user = req.user;
        const result = await (0, db_1.query)('SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC', [user.id]);
        const todos = result.rows;
        res.status(200).json({ todos });
    }
    catch (error) {
        console.error('Get all todos error:', error);
        logError('Get all todos error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllTodos = getAllTodos;
const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const result = await (0, db_1.query)('SELECT * FROM todos WHERE id = $1 AND user_id = $2', [id, user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        const todo = result.rows[0];
        res.status(200).json({ todo });
    }
    catch (error) {
        console.error('Get todo by id error:', error);
        logError('Get todo by id error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getTodoById = getTodoById;
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const user = req.user;
        // Check if todo exists and belongs to user
        const existingTodo = await (0, db_1.query)('SELECT * FROM todos WHERE id = $1 AND user_id = $2', [id, user.id]);
        if (existingTodo.rows.length === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        const result = await (0, db_1.query)('UPDATE todos SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *', [title, description, id]);
        const todo = result.rows[0];
        res.status(200).json({ message: 'Todo updated successfully', todo });
    }
    catch (error) {
        console.error('Update todo error:', error);
        logError('Update todo error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        // Check if todo exists and belongs to user
        const existingTodo = await (0, db_1.query)('SELECT * FROM todos WHERE id = $1 AND user_id = $2', [id, user.id]);
        if (existingTodo.rows.length === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        await (0, db_1.query)('DELETE FROM todos WHERE id = $1', [id]);
        res.status(200).json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        console.error('Delete todo error:', error);
        logError('Delete todo error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deleteTodo = deleteTodo;
const toggleTodoCompletion = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        // Check if todo exists and belongs to user
        const existingTodo = await (0, db_1.query)('SELECT * FROM todos WHERE id = $1 AND user_id = $2', [id, user.id]);
        if (existingTodo.rows.length === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        const result = await (0, db_1.query)('UPDATE todos SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *', [id]);
        const todo = result.rows[0];
        res.status(200).json({ message: 'Todo completion status updated', todo });
    }
    catch (error) {
        console.error('Toggle todo completion error:', error);
        logError('Toggle todo completion error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.toggleTodoCompletion = toggleTodoCompletion;
// Error logging utility
const logError = async (message, error) => {
    try {
        const errorMessage = error instanceof Error ? error.message : String(error);
        await (0, db_1.query)('INSERT INTO logs (level, message) VALUES ($1, $2)', ['ERROR', `${message}: ${errorMessage}`]);
    }
    catch (logError) {
        console.error('Failed to log error:', logError);
    }
};
//# sourceMappingURL=todoController.js.map