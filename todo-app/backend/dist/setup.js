"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
async function setupDatabase() {
    console.log('Setting up database...');
    const dbName = process.env.PG_DATABASE || 'todo_app';
    // First, connect to PostgreSQL without specifying a database to create the database
    const adminClient = new pg_1.Client({
        host: process.env.PG_HOST || 'localhost',
        user: process.env.PG_USER || 'postgres',
        password: process.env.PG_PASSWORD || 'postgres',
        port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
        database: 'postgres', // Connect to default database first
    });
    try {
        await adminClient.connect();
        console.log('✓ Connected to PostgreSQL server');
        // Check if database exists
        const dbCheck = await adminClient.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
        if (dbCheck.rowCount === 0) {
            // Database doesn't exist, create it
            console.log(`Creating database '${dbName}'...`);
            await adminClient.query(`CREATE DATABASE ${dbName}`);
            console.log(`✓ Database '${dbName}' created successfully`);
        }
        else {
            console.log(`✓ Database '${dbName}' already exists`);
        }
        await adminClient.end();
        // Now connect to the actual database
        const pool = new pg_1.Pool({
            host: process.env.PG_HOST || 'localhost',
            user: process.env.PG_USER || 'postgres',
            password: process.env.PG_PASSWORD || 'postgres',
            database: dbName,
            port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
        });
        const client = await pool.connect();
        console.log('✓ Connected to database');
        // Create users table
        await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('✓ Users table created');
        // Create todos table
        await client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('✓ Todos table created');
        // Create logs table
        await client.query(`
      CREATE TABLE IF NOT EXISTS logs (
        id SERIAL PRIMARY KEY,
        level VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('✓ Logs table created');
        // Add indexes
        await client.query(`
      CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id)
    `);
        console.log('✓ Indexes created');
        // Close the connection
        client.release();
        await pool.end();
        console.log('\n🎉 Database setup completed successfully!');
        console.log('\nNext steps:');
        console.log('1. Make sure your JWT_SECRET is set in the .env file');
        console.log('2. Run `npm run dev` to start the server');
    }
    catch (error) {
        console.error('❌ Database setup failed:', error);
        process.exit(1);
    }
}
// Run the setup
setupDatabase();
//# sourceMappingURL=setup.js.map