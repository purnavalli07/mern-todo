# 🚀 MERN Todo App

A full-stack Todo application built using the MERN stack.  
Users can create, view, update, and delete tasks with persistent MongoDB storage.

# Features:

✅ Create tasks  
✅ View tasks  
✅ Update tasks  
✅ Delete tasks  
✅ Mark tasks as completed  

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

## 📁 Project Structure

mern-todo-app/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api.js
│ │ └── App.jsx
│ └── package.json
│
└── README.md
---

## ⚙️ Installation

Clone repository:

git clone https://github.com/purnavalli07/mern-todo.git
cd mern-todo

---

## ▶️ Run Backend
cd backend
npm install
node server.js

Backend runs on: http://localhost:5050/

---
## 🌐 Environment Variables

Create `.env` inside backend:

PORT=5050
MONGO_URI=your_mongodb_connection_string


## ▶️ Run Frontend

Open new terminal:
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173/


---

## 🔗 API Routes

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /api/todos | Get all todos |
| POST | /api/todos | Create todo |
| PUT | /api/todos/:id | Update todo |
| DELETE | /api/todos/:id | Delete todo |

---


