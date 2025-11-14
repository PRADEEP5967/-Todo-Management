# Todo List App - Frontend

A modern React.js frontend for the Todo List application with JWT authentication.

## Features

- User Authentication (Signup, Signin, Forgot Password, Reset Password)
- Todo Management (Create, Read, Update, Delete)
- Responsive design with Tailwind CSS
- Dark mode support
- Protected routes
- Toast notifications

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## API Integration

The frontend connects to the backend API running on `http://localhost:5000`. Make sure the backend server is running before starting the frontend.

## Folder Structure

```
src/
├── api/
│   └── axios.ts          # Axios instance with interceptors
├── components/
│   ├── Button.tsx        # Reusable button component
│   ├── Input.tsx         # Reusable input component
│   ├── Navbar.tsx        # Navigation bar with user profile
│   ├── ProtectedRoute.tsx # Route protection component
│   ├── Toast.tsx         # Toast notification component
│   └── DarkModeToggle.tsx # Dark mode toggle component
├── context/
│   ├── AuthContext.tsx   # Authentication context
│   └── TodoContext.tsx   # Todo context
├── pages/
│   ├── Auth/
│   │   ├── Signup.tsx    # User signup page
│   │   ├── Signin.tsx    # User signin page
│   │   ├── ForgotPassword.tsx # Forgot password page
│   │   └── ResetPassword.tsx # Reset password page
│   └── Todos.tsx         # Todo management page
└── utils/
    └── errorHandler.ts   # API error handling utility
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the built app

## Testing the APIs

1. Start the backend server (should be running on port 5000)
2. Start the frontend development server (`npm run dev`)
3. Open your browser to `http://localhost:5173` (default Vite port)
4. You can now test all the authentication and todo management features

## API Endpoints

The frontend integrates with the following backend API routes:

- `GET http://localhost:5000/api/health`
- `POST http://localhost:5000/api/users/signup`
- `POST http://localhost:5000/api/users/signin`
- `POST http://localhost:5000/api/users/forgot-password`
- `POST http://localhost:5000/api/users/reset-password`
- `GET http://localhost:5000/api/todos`
- `POST http://localhost:5000/api/todos`
- `PUT http://localhost:5000/api/todos/:id`
- `DELETE http://localhost:5000/api/todos/:id`

## Authentication Flow

1. Users can sign up for a new account
2. Existing users can sign in with their credentials
3. Forgot password functionality sends a reset link
4. Users can reset their password with the link
5. Authenticated users can access the todo management page
6. Session is persisted in localStorage

## Todo Management

1. Add new todos with title and description
2. View all todos in a list
3. Mark todos as complete/incomplete
4. Edit existing todos
5. Delete todos
6. Todos are associated with the logged-in user
