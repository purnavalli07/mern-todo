import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/todos");
      const todo = res.data.find(t => t._id === id);
      
      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description);
      } else {
        alert("Task not found");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Error loading task");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    try {
      await axios.put(`http://localhost:5050/api/todos/${id}`, {
        title,
        description
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error updating task");
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="form-wrapper">
          <p style={{ textAlign: "center", color: "#666" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Edit Task</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter task description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTodo;