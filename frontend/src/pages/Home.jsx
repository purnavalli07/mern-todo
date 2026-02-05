import { useState, useEffect } from "react";
import axios from "axios";

function Home() {

  const [todos, setTodos] = useState([]);

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

  return (
    <div>
      <h2>Todo List</h2>

      {todos.map((todo) => (
        <div key={todo._id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
        </div>
      ))}

    </div>
  );
}

export default Home;
