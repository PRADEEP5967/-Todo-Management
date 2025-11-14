import { Request, Response } from 'express';
import { query } from '../utils/db';
import { Todo } from '../models/interfaces';

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const user = (req as any).user;

    const result = await query(
      'INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [user.id, title, description]
    );

    const todo: Todo = result.rows[0];
    res.status(201).json({ message: 'Todo created successfully', todo });
  } catch (error) {
    console.error('Create todo error:', error);
    logError('Create todo error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const result = await query(
      'SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC',
      [user.id]
    );

    const todos: Todo[] = result.rows;
    res.status(200).json({ todos });
  } catch (error) {
    console.error('Get all todos error:', error);
    logError('Get all todos error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const result = await query(
      'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
      [id, user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const todo: Todo = result.rows[0];
    res.status(200).json({ todo });
  } catch (error) {
    console.error('Get todo by id error:', error);
    logError('Get todo by id error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const user = (req as any).user;

    // Check if todo exists and belongs to user
    const existingTodo = await query(
      'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
      [id, user.id]
    );

    if (existingTodo.rows.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const result = await query(
      'UPDATE todos SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [title, description, id]
    );

    const todo: Todo = result.rows[0];
    res.status(200).json({ message: 'Todo updated successfully', todo });
  } catch (error) {
    console.error('Update todo error:', error);
    logError('Update todo error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    // Check if todo exists and belongs to user
    const existingTodo = await query(
      'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
      [id, user.id]
    );

    if (existingTodo.rows.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await query('DELETE FROM todos WHERE id = $1', [id]);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    logError('Delete todo error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const toggleTodoCompletion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    // Check if todo exists and belongs to user
    const existingTodo = await query(
      'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
      [id, user.id]
    );

    if (existingTodo.rows.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const result = await query(
      'UPDATE todos SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id]
    );

    const todo: Todo = result.rows[0];
    res.status(200).json({ message: 'Todo completion status updated', todo });
  } catch (error) {
    console.error('Toggle todo completion error:', error);
    logError('Toggle todo completion error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Error logging utility
const logError = async (message: string, error: any) => {
  try {
    const errorMessage = error instanceof Error ? error.message : String(error);
    await query(
      'INSERT INTO logs (level, message) VALUES ($1, $2)',
      ['ERROR', `${message}: ${errorMessage}`]
    );
  } catch (logError) {
    console.error('Failed to log error:', logError);
  }
};