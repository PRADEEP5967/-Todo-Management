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
   - Copy `.env.example` to `.env`
   - Update the `DATABASE_URL` with your PostgreSQL connection string
   - Update the `JWT_SECRET` with a strong secret key

4. Run database migrations:
   ```bash
   npm run migrate
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
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT token signing

## Development

- Build TypeScript: `npm run build`
- Start production server: `npm start`
- Run development server: `npm run dev`
- Run migrations: `npm run migrate`

## Error Handling

All errors are logged to the `logs` table in the database for debugging purposes.