import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TodoContext from '../context/TodoContext';
import AuthContext from '../context/AuthContext';
import { showToast } from './Toast';

const ModernTodoApp: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [isAdding, setIsAdding] = useState(false);

  const todoContext = useContext(TodoContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!todoContext || !authContext) {
    throw new Error('Todos must be used within TodoProvider and AuthProvider');
  }

  const { todos, loading, fetchTodos, addTodo, updateTodo, deleteTodo, toggleTodo } = todoContext;
  const { user, signout } = authContext;

  useEffect(() => {
    fetchTodos();
  }, []);

  // Filter and sort todos
  const filteredAndSortedTodos = todos
    .filter(todo => {
      // Search filter
      const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          todo.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = filter === 'all' || 
                          (filter === 'completed' && todo.completed) || 
                          (filter === 'pending' && !todo.completed);
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        await addTodo(title, description);
        setTitle('');
        setDescription('');
        setIsAdding(false);
        showToast({ message: 'Task added successfully!', type: 'success' });
      } catch (err: any) {
        console.error('Failed to add todo', err);
        showToast({ message: err.message || 'Failed to add task', type: 'error' });
      }
    }
  };

  const handleUpdateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTodo && editTitle.trim()) {
      try {
        await updateTodo(editingTodo.id, editTitle, editDescription, editingTodo.completed);
        setEditingTodo(null);
        setEditTitle('');
        setEditDescription('');
        showToast({ message: 'Task updated successfully!', type: 'success' });
      } catch (err: any) {
        console.error('Failed to update todo', err);
        showToast({ message: err.message || 'Failed to update task', type: 'error' });
      }
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      showToast({ message: 'Task deleted successfully!', type: 'success' });
    } catch (err: any) {
      console.error('Failed to delete todo', err);
      showToast({ message: err.message || 'Failed to delete task', type: 'error' });
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      await toggleTodo(id);
    } catch (err: any) {
      console.error('Failed to toggle todo', err);
      showToast({ message: err.message || 'Failed to update task status', type: 'error' });
    }
  };

  const startEditing = (todo: any) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const cancelEditing = () => {
    setEditingTodo(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleSignout = () => {
    signout();
    navigate('/signin');
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const todoItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">TaskFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsAdding(!isAdding)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Task
              </motion.button>
              <div className="relative">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSignout}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    {user?.username.charAt(0).toUpperCase()}
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        {!loading && (
          <motion.div 
            className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700"
              variants={item}
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{todos.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
            </motion.div>
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700"
              variants={item}
            >
              <div className="text-2xl font-bold text-green-600">{todos.filter(t => t.completed).length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
            </motion.div>
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700"
              variants={item}
            >
              <div className="text-2xl font-bold text-amber-500">{todos.filter(t => !t.completed).length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Pending</div>
            </motion.div>
          </motion.div>
        )}

        {/* Add Todo Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Task</h2>
                <form onSubmit={handleAddTodo}>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Task title"
                        required
                      />
                    </div>
                    
                    <div>
                      <textarea
                        rows={2}
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Description (optional)"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add Task
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Todo Form */}
        <AnimatePresence>
          {editingTodo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Edit Task</h2>
                <form onSubmit={handleUpdateTodo}>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Task title"
                        required
                      />
                    </div>
                    
                    <div>
                      <textarea
                        rows={2}
                        value={editDescription}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Description (optional)"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Update Task
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        {!loading && todos.length > 0 && (
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'pending')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        )}

        {/* Todo List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Tasks {filteredAndSortedTodos.length > 0 && `(${filteredAndSortedTodos.length})`}
            </h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredAndSortedTodos.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center border border-gray-200 dark:border-gray-700"
            >
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-4">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No tasks found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Get started by adding your first task'}
              </p>
              <button
                onClick={() => setIsAdding(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add your first task
              </button>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 gap-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence>
                {filteredAndSortedTodos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    variants={todoItem}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    layout
                    className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleToggleTodo(todo.id)}
                        className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 mt-1 ${
                          todo.completed 
                            ? 'bg-indigo-600 border-indigo-600' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {todo.completed && (
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </motion.button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          todo.completed 
                            ? 'text-gray-500 dark:text-gray-400 line-through' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {todo.title}
                        </p>
                        {todo.description && (
                          <p className={`text-xs mt-1 ${
                            todo.completed 
                              ? 'text-gray-400 dark:text-gray-500 line-through' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {todo.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                          {new Date(todo.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-2">
                        <button
                          onClick={() => startEditing(todo)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTodoApp;