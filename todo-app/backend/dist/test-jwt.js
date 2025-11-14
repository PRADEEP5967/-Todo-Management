"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
function testJWT() {
    console.log('Testing JWT functionality...\n');
    // Check if JWT_SECRET is configured
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('❌ JWT_SECRET is not configured in environment variables');
        console.log('\nPlease set JWT_SECRET in your .env file');
        process.exit(1);
    }
    console.log('✓ JWT_SECRET is configured');
    // Test token creation
    const payload = {
        userId: 123,
        email: 'test@example.com',
    };
    console.log('\nCreating JWT token...');
    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: '1h' });
    console.log('✓ JWT token created successfully');
    console.log('Token:', token);
    // Test token verification
    console.log('\nVerifying JWT token...');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        console.log('✓ JWT token verified successfully');
        console.log('Decoded payload:', decoded);
    }
    catch (error) {
        console.error('❌ JWT token verification failed:', error);
        process.exit(1);
    }
    // Test token expiration
    console.log('\nTesting token expiration...');
    const expiredToken = jsonwebtoken_1.default.sign({ userId: 456, email: 'expired@example.com' }, jwtSecret, { expiresIn: '1ms' } // Expire immediately
    );
    // Wait a bit to ensure token expires
    setTimeout(() => {
        try {
            jsonwebtoken_1.default.verify(expiredToken, jwtSecret);
            console.log('❌ Expired token should have failed verification');
            process.exit(1);
        }
        catch (error) {
            console.log('✓ Expired token correctly rejected');
            console.log('\n🎉 All JWT tests passed!');
            process.exit(0);
        }
    }, 100);
}
// Run the JWT test
testJWT();
//# sourceMappingURL=test-jwt.js.map