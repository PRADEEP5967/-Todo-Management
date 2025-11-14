import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import api from '../api/axios';

interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string, description: string) => Promise<void>;
  updateTodo: (id: number, title: string, description: string, completed: boolean) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/todos');
      setTodos(response.data.todos);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string, description: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/todos', { title, description });
      const newTodo = response?.data?.todo ?? response?.data?.data ?? response?.data;
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add todo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id: number, title: string, description: string, completed: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const t = title?.trim();
      const d = typeof description === 'string' ? description : '';

      // Candidate payloads (some backends reject unknown fields)
      const payloads = [
        { title: t, description: d },
        { title: t, description: d, completed },
      ];

      const paths = [`/todos/${id}`, `/todo/${id}`];
      const methods: Array<'put' | 'patch'> = ['put', 'patch'];

      let lastErr: any = null;
      let updated: any = null;
      outer: for (const path of paths) {
        for (const method of methods) {
          for (const body of payloads) {
            try {
              const res = await api[method](path, body);
              updated = res?.data?.todo ?? res?.data?.data ?? res?.data;
              break outer;
            } catch (err: any) {
              // Try next option on 400/404/405; capture last error
              const status = err?.response?.status;
              lastErr = err;
              if (status && ![400, 404, 405].includes(status)) {
                // For other errors, abort attempts
                throw err;
              }
            }
          }
        }
      }

      if (!updated) {
        const msg = lastErr?.response?.data?.message || lastErr?.message || 'Failed to update todo';
        throw new Error(msg);
      }

      setTodos((prev) => prev.map(todo => (todo.id === id ? updated : todo)));
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to update todo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter(todo => todo.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete todo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.patch(`/todos/${id}/toggle`);
      const updated = response?.data?.todo ?? response?.data?.data ?? response?.data;
      setTodos((prev) => prev.map(todo => (todo.id === id ? updated : todo)));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to toggle todo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;