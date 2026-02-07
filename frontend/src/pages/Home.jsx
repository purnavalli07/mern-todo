import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api";

function Home() {

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // ⭐ NEW STATES
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  // ⭐ UPDATED fetch with loading + error
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await API.get("/todos");
      setTodos(res.data);

    } catch (error) {
      console.log(error);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.log(error);
      setError("Failed to delete task.");
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const todo = todos.find(t => t._id === id);

      await API.put(`/todos/${id}`, {
        ...todo,
        completed: !currentStatus
      });

      fetchTodos();

    } catch (error) {
      console.log(error);
      setError("Failed to update task.");
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="container">
      <div className="todos-wrapper">

        <h1>My Tasks</h1>

        {/* ⭐ Loading State */}
        {loading && <p>Loading tasks...</p>}

        {/* ⭐ Error State */}
        {error && <p style={{color:"red"}}>{error}</p>}

        {!loading && (
          <>
            <div className="todos-header">

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

            {filteredTodos.length === 0 ? (

              <div className="empty-state">
                <p>{filter === "all"
                    ? "No tasks yet!"
                    : `No ${filter} tasks`}
                </p>
              </div>

            ) : (

              filteredTodos.map((todo) => (

                <div
                  className={`todo-card ${todo.completed ? "completed" : ""}`}
                  key={todo._id}
                >

                  <div className="todo-header">

                    <div className="todo-title-wrapper">

                      <input
                        type="checkbox"
                        checked={todo.completed || false}
                        onChange={() =>
                          toggleComplete(todo._id, todo.completed)
                        }
                      />

                      <h3>{todo.title}</h3>

                    </div>

                    <span
                      className={`todo-status ${todo.completed ? "completed" : "pending"}`}
                    >
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
          </>
        )}

      </div>
    </div>
  );
}

export default Home;
