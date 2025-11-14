import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import todoRoutes from './routes/todoRoutes';
import { createTables } from './models/Schema';
import pool from './utils/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Todo API is running' });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Initialize database tables and start server
createTables().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await pool.end();
    server.close(() => {
      console.log('Process terminated');
    });
  });
}).catch((error) => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});