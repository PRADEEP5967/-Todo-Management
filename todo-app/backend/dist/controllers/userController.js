"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.signin = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../utils/db");
// In-memory store for reset tokens (in production, use Redis or database)
const resetTokens = new Map();
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingUser = await (0, db_1.query)('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        // Create user
        const result = await (0, db_1.query)('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email', [username, email, hashedPassword]);
        const user = result.rows[0];
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const result = await (0, db_1.query)('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const user = result.rows[0];
        // Check password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Signin successful', token, user: { id: user.id, username: user.username, email: user.email } });
    }
    catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.signin = signin;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // Check if user exists
        const result = await (0, db_1.query)('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }
        const user = result.rows[0];
        // Generate reset token (in production, use a more secure method)
        const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const expires = new Date(Date.now() + 3600000); // 1 hour
        // Store token in memory (in production, store in database or Redis)
        resetTokens.set(resetToken, { userId: user.id, expires });
        // In a real application, you would send an email with the reset link
        // For this example, we'll just return the token
        res.status(200).json({ message: 'Password reset token generated', resetToken });
    }
    catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        // Check if token exists and is valid
        const tokenData = resetTokens.get(token);
        if (!tokenData) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        if (tokenData.expires < new Date()) {
            resetTokens.delete(token);
            return res.status(400).json({ message: 'Token has expired' });
        }
        // Hash new password
        const saltRounds = 10;
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, saltRounds);
        // Update user password
        await (0, db_1.query)('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, tokenData.userId]);
        // Remove token
        resetTokens.delete(token);
        res.status(200).json({ message: 'Password reset successful' });
    }
    catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=userController.js.map