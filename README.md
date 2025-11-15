# To-Do List Backend API

Minimal Node.js backend for a To-Do List Application with user authentication and task management.

## Features

- User registration and login with JWT authentication
- CRUD operations for tasks
- Task categorization and status management
- Search and filtering capabilities
- MongoDB with proper indexing

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_jwt_secret_key_here
```

3. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks (Protected Routes)
- `POST /api/tasks` - Create new task
- `GET /api/tasks` - Get all tasks (supports filtering)
- `GET /api/tasks/:taskId` - Get task by ID
- `PUT /api/tasks/:taskId` - Update task
- `DELETE /api/tasks/:taskId` - Delete task
- `POST /api/tasks/:taskId/markCompleted` - Mark task as completed
- `POST /api/tasks/:taskId/markPending` - Mark task as pending
- `GET /api/tasks/category/:category` - Get tasks by category
- `GET /api/tasks/search?q=query` - Search tasks by title/description

## Project Structure

```
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   └── Task.js
├── routes/
│   ├── auth.js
│   └── tasks.js
├── .env
├── .gitignore
├── package.json
└── server.js
```
