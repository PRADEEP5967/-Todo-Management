# Todo List API - Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Update the `.env` file with your PostgreSQL connection details:
```env
# Database - PostgreSQL Connection
PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=your_password
PG_DATABASE=todo_app
PG_PORT=5432

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
```

### 3. Setup Database
Run the setup script to create tables:
```bash
npm run setup
```

### 4. Test JWT Functionality
Verify JWT is working correctly:
```bash
npm run test-jwt
```

### 5. Start Development Server
```bash
npm run dev
```

## Command Line Summary
```bash
# Install dependencies
npm install

# Setup database tables
npm run setup

# Test JWT
npm run test-jwt

# Start development server
npm run dev
```

# Todo List API

A fully functional Todo List application with JWT authentication built with Node.js, TypeScript, and PostgreSQL.

## Features

- User Management with JWT authentication
  - User Signup
  - User Sign-in (Login)
  - User Forgot/Reset Password
- Todo Management
  - Create Todo
  - Update Todo
  - List Todos
  - Delete Todo
  - Mark Todo as Completed or Not Completed

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend/` directory
   - Set `PG_HOST`, `PG_USER`, `PG_PASSWORD`, `PG_DATABASE`, `PG_PORT`, and `JWT_SECRET`
   - Optionally, you can use a single `DATABASE_URL` instead of individual PG_* variables

4. Initialize database tables:
   ```bash
   npm run setup
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup Options

### Option 1: Local PostgreSQL with Docker

1. Install Docker
2. Run PostgreSQL container:
   ```bash
   docker run -d \
     --name todo-postgres \
     -e POSTGRES_DB=todo_app \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=postgres \
     -p 5432:5432 \
     postgres:13
   ```

### Option 2: Free Cloud PostgreSQL Services

1. **Supabase** (https://supabase.com/)
   - Create a free account
   - Create a new project
   - Get your database connection string from Settings > Database

2. **ElephantSQL** (https://www.elephantsql.com/)
   - Create a free account (Tiny Turtle plan)
   - Create a new instance
   - Get your connection URL from Details page

## API Endpoints

### User Management

- `POST /api/users/signup` - User registration
- `POST /api/users/signin` - User login
- `POST /api/users/forgot-password` - Request password reset
- `POST /api/users/reset-password` - Reset password

### Todo Management

- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status

## Environment Variables

- `PORT` - Server port (default: 5000)
- `PG_HOST` - PostgreSQL host (e.g., `localhost`)
- `PG_USER` - PostgreSQL username (e.g., `postgres`)
- `PG_PASSWORD` - PostgreSQL password
- `PG_DATABASE` - PostgreSQL database name (e.g., `todo_app`)
- `PG_PORT` - PostgreSQL port (default: `5432`)
- `JWT_SECRET` - Secret key for JWT token signing
- `DATABASE_URL` - Optional single connection string (overrides PG_* when provided)

## Development

- Build TypeScript: `npm run build`
- Start production server: `npm start`
- Run development server: `npm run dev`
- Run migrations: `npm run migrate`

## Error Handling

All errors are logged to the `logs` table in the database for debugging purposes.

## Authentication

- All `/api/todos` routes require a valid Bearer token.
- Include header: `Authorization: Bearer <JWT>`.
- Tokens are issued by `POST /api/users/signin` and expire in 1 hour.

## API Request/Response Examples

### Users

1) Signup `POST /api/users/signup`

Request
```json
{
  "username": "jane",
  "email": "jane@example.com",
  "password": "strongpass"
}
```

Response 201
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "username": "jane",
    "email": "jane@example.com"
  }
}
```

2) Signin `POST /api/users/signin`

Request
```json
{
  "email": "jane@example.com",
  "password": "strongpass"
}
```

Response 200
```json
{
  "message": "Signin successful",
  "token": "<JWT>",
  "user": { "id": 1, "username": "jane", "email": "jane@example.com" }
}
```

3) Forgot Password `POST /api/users/forgot-password`

Request
```json
{ "email": "jane@example.com" }
```

Response 200
```json
{ "message": "Password reset token generated", "resetToken": "<token>" }
```

4) Reset Password `POST /api/users/reset-password`

Request
```json
{ "token": "<token>", "newPassword": "newStrongPass" }
```

Response 200
```json
{ "message": "Password reset successful" }
```

### Todos (Authenticated)

Headers
```bash
Authorization: Bearer <JWT>
Content-Type: application/json
```

1) Create `POST /api/todos`
```json
{ "title": "Buy milk", "description": "2 liters" }
```
Response 201
```json
{ "message": "Todo created successfully", "todo": { ... } }
```

2) List `GET /api/todos`
Response 200
```json
{ "todos": [ { ... }, { ... } ] }
```

3) Get by ID `GET /api/todos/:id`
Response 200
```json
{ "todo": { ... } }
```

4) Update `PUT /api/todos/:id`
```json
{ "title": "Buy milk & bread", "description": "2 liters + whole grain" }
```
Response 200
```json
{ "message": "Todo updated successfully", "todo": { ... } }
```

5) Delete `DELETE /api/todos/:id`
Response 200
```json
{ "message": "Todo deleted successfully" }
```

6) Toggle Complete `PATCH /api/todos/:id/toggle`
Response 200
```json
{ "message": "Todo completion status updated", "todo": { ... } }
```

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
