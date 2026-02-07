import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/todos");
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const todo = todos.find(t => t._id === id);
      await axios.put(`http://localhost:5050/api/todos/${id}`, {
        ...todo,
        completed: !currentStatus
      });
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="container">
      <div className="page-header">
        <h1>TODO LIST</h1>
        <p>Manage your tasks efficiently</p>
      </div>

      <div className="todos-wrapper">
        <div className="todos-header">
          <h2>My Tasks</h2>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              ALL
            </button>
            <button 
              className={`filter-btn ${filter === "pending" ? "active" : ""}`}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button 
              className={`filter-btn ${filter === "completed" ? "active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>
              {filter === "all" 
                ? "Add your first task to get started!" 
                : filter === "completed"
                ? "No completed tasks yet."
                : "No pending tasks!"}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div 
              className={`todo-card ${todo.completed ? "completed" : "pending"}`} 
              key={todo._id}
            >
              <div className="todo-header">
                <div className="todo-title-wrapper">
                  <div className="checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      checked={todo.completed || false}
                      onChange={() => toggleComplete(todo._id, todo.completed)}
                    />
                  </div>
                  <h3>{todo.title}</h3>
                </div>
                <span className={`todo-status ${todo.completed ? "completed" : "pending"}`}>
                  {todo.completed ? "Done" : "Pending"}
                </span>
              </div>

              {todo.description && <p>{todo.description}</p>}

              <div className="todo-actions">
                <Link to={`/edit/${todo._id}`}>
                  <button className="btn-edit">Edit</button>
                </Link>

                <button
                  className="btn-delete"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;