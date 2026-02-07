import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await API.get("/todos");
        const todo = res.data.find(t => t._id === id);
        if (todo) {
          setTitle(todo.title);
          setDescription(todo.description);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a title");

    try {
      await API.put(`/todos/${id}`, { title, description });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submit">Update Task</button>
        </form>
      </div>
    </div>
  );
}

export default EditTodo;