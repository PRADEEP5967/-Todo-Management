export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Log {
  id: number;
  level: string;
  message: string;
  timestamp: Date;
}