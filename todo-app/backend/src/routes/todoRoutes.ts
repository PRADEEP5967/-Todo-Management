  import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { 
  createTodo, 
  getAllTodos, 
  getTodoById, 
  updateTodo, 
  deleteTodo, 
  toggleTodoCompletion 
} from '../controllers/todoController';
import { validateTodo } from '../middleware/validation';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

router.post('/', validateTodo, createTodo);
router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.put('/:id', validateTodo, updateTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id/toggle', toggleTodoCompletion);

export default router;