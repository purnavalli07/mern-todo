import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AddTodo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a title");

    try {
      await API.post("/todos", {
        title,
        description,
        completed: false
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              placeholder="Enter description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submit">Add Task</button>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;