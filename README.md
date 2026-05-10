# Task-01: Basic REST API

This project is a basic REST API built with Node.js and Express. It performs standard CRUD (Create, Read, Update, Delete) operations on a "users" resource using an in-memory data structure.

## Features
- **In-Memory Storage**: Uses a simple JavaScript array to mock a database.
- **UUIDs**: Each user is assigned a unique identifier using the `uuid` package.
- **Validation**: Strict input validation for required fields (name, email, age) and data formats (valid email, positive numbers for age).
- **Proper HTTP Status Codes**: Returns correct status codes like `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, and `404 Not Found`.

## Technology Stack
- **Node.js**
- **Express.js** (Web framework)
- **uuid** (Unique identifier generation)

## Installation

1. Ensure you have Node.js installed.
2. Clone or download this folder.
3. Open a terminal in the project folder and install the dependencies:
   ```bash
   npm install
   ```

## Running the Server

Start the application using Node:
```bash
node index.js
```
The server will start running on `http://localhost:3000`.

## API Endpoints

### 1. Create a User
- **URL**: `/api/users`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
  ```
- **Success Response**: `201 Created`

### 2. Get All Users
- **URL**: `/api/users`
- **Method**: `GET`
- **Success Response**: `200 OK` (Returns an array of user objects)

### 3. Get a Specific User
- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Success Response**: `200 OK`
- **Error Response**: `404 Not Found` (If user ID does not exist)

### 4. Update a User
- **URL**: `/api/users/:id`
- **Method**: `PUT`
- **Body** (Fields are optional):
  ```json
  {
    "age": 31
  }
  ```
- **Success Response**: `200 OK`
- **Error Response**: `404 Not Found` or `400 Bad Request` (If validation fails)

### 5. Delete a User
- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Success Response**: `204 No Content`
- **Error Response**: `404 Not Found`
