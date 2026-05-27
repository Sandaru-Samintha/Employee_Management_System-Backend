# Employee Management Backend

Simple Node.js / Express backend for employee and user management using MongoDB.

## Features

- User registration and login
- JWT authentication
- Admin-only employee creation, update, and deletion
- Authenticated users can view all employees
- Public visitors can view only active employees

## Requirements

- Node.js 18+ / 20+
- MongoDB connection string
- `.env` file with required values

## Setup

1. Clone or download the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with the following values:

```env
MONGO_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN_HOURS=24
PORT=3000
```

Example `MONGO_URL` for MongoDB Atlas:

```env
MONGO_URL=mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

## Run

Start the server with:

```bash
npm start
```

The app listens on the `PORT` environment variable or defaults to `3000`.

## API Endpoints

### User Routes

- `POST /api/users/registeruser`
  - Registers a new user
  - Body: `email`, `firstName`, `lastName`, `password`, `role`

- `POST /api/users/login`
  - Authenticates a user and returns a JWT
  - Body: `email`, `password`

- `POST /api/users/saveuser`
  - Creates a new user
  - Requires admin access
  - Authorization: `Bearer <token>`
  - Body: `email`, `firstName`, `lastName`, `password`, `role`

- `GET /api/users/getusers`
  - Returns all users

### Employee Routes

- `POST /api/employees/saveemployee`
  - Creates a new employee
  - Requires admin access
  - Authorization: `Bearer <token>`
  - Body: `employeeId`, `name`, `email`, `role`, `status`, `phoneNumber`

- `GET /api/employees/getemployees`
  - Returns all employees for authenticated requests
  - Returns only active employees for unauthenticated requests

- `GET /api/employees/getemployee/:id`
  - Returns one employee by `employeeId`

- `PUT /api/employees/updateemployee/:id`
  - Updates an employee by `employeeId`
  - Requires admin access
  - Authorization: `Bearer <token>`

- `DELETE /api/employees/deleteemployee/:id`
  - Deletes an employee by `employeeId`
  - Requires admin access
  - Authorization: `Bearer <token>`

## Authentication

Send the JWT token in the `Authorization` header on protected routes:

```http
Authorization: Bearer <token>
```

## Notes

- Employee `email` and `phoneNumber` are unique.
- User `email` is unique.
- If a duplicate value is submitted, the API returns a `400` response with a message describing the duplicate field.

## Troubleshooting

- If the app fails to connect to MongoDB, verify `MONGO_URL` and network access.
- If JWT verification fails, check `JWT_SECRET` matches the value used when signing tokens.
