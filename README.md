# bookstore
# Bookstore CRUD App

A full-stack web application for managing books with user authentication. Built with React (frontend), Node.js/Express (backend), MongoDB (database), and JWT for authentication.

---

## Features
- User registration and login (JWT-based authentication)
- Add, view, edit, and delete books
- Responsive, modern UI with CSS Modules
- Protected book management routes (only logged-in users can manage books)

---

## Tech Stack
- **Frontend:** React, React Router, CSS Modules, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

---

## Folder Structure
```
crudtask/
  backend/      # Express API, MongoDB models, controllers
  frontend/     # React app (Vite), components, styles
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/shamtarani05/bookstore.git
cd crudtask
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Make sure MongoDB is running locally (default: `mongodb://localhost:27017/bookstore`).
- Start the backend server:
```bash
node server.js
```
- The backend runs on `http://localhost:3000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
- The frontend runs on `http://localhost:5173`

---

## Usage
1. Register a new user or login with existing credentials.
2. After login, you can add, view, edit, and delete books.
3. All book management routes are protected and require authentication.

---

## API Endpoints (Backend)
- `POST /api/signup` — Register a new user
- `POST /api/login` — Login and receive JWT token
- `GET /api/books` — Get all books (auth required)
- `POST /api/books` — Add a new book (auth required)
- `PUT /api/books/:id` — Edit a book (auth required)
- `DELETE /api/books/:id` — Delete a book (auth required)

---

## Environment Variables
- You can change the MongoDB connection string or JWT secret in the backend as needed.

---

## Notes
- Make sure both backend and frontend are running for full functionality.
- The JWT token is stored in localStorage and sent with each protected request.
- The UI is responsive and works on desktop and mobile.

