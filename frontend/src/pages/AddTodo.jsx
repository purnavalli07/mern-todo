import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTodo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    try {
      await axios.post("http://localhost:5050/api/todos", {
        title,
        description,
        completed: false
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error adding task");
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Add New Task</h2>

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
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;