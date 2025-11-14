import { Request, Response } from 'express';
export declare const createTodo: (req: Request, res: Response) => Promise<void>;
export declare const getAllTodos: (req: Request, res: Response) => Promise<void>;
export declare const getTodoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const toggleTodoCompletion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=todoController.d.ts.map