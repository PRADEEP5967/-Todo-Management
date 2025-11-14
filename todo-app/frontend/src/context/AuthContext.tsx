import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../api/axios';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  signup: (username: string, email: string, password: string) => Promise<any>;
  signin: (email: string, password: string) => Promise<any>;
  signout: () => void;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (token: string, newPassword: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Try a list of possible endpoint paths until one succeeds
  const postFirstSuccessful = async (paths: string[], payload: any) => {
    let lastError: any = null;
    for (const path of paths) {
      try {
        const res = await api.post(path, payload);
        return res.data;
      } catch (err: any) {
        // If 404/405, try next; otherwise keep last error and continue
        const status = err?.response?.status;
        lastError = err;
        if (status && ![404, 405].includes(status)) {
          break;
        }
      }
    }
    throw lastError || new Error('Request failed');
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const data = await postFirstSuccessful(
        ['/users/signup', '/auth/register', '/auth/signup', '/register'],
        { username, email, password }
      );
      return data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Signup failed';
      throw new Error(message);
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const data = await postFirstSuccessful(
        ['/users/signin', '/auth/login', '/auth/signin', '/login'],
        { email, password }
      ) ?? {};
      const token = data.token || data.accessToken || data.jwt || data.idToken;
      const user = data.user || data.profile || data.account || data.data?.user || null;

      if (!token || !user) {
        throw new Error('Invalid signin response from server');
      }

      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setToken(token);
      setUser(user);

      return { token, user };
    } catch (error: any) {
      const status = error?.response?.status;
      const raw = error?.response?.data?.message || error?.message || 'Signin failed';
      const message = status === 401 ? 'Invalid email or password' : raw;
      throw new Error(message);
    }
  };

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await api.post('/users/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to send reset password email';
      throw new Error(message);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const response = await api.post('/users/reset-password', { token, newPassword });
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to reset password';
      throw new Error(message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signup,
        signin,
        signout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;