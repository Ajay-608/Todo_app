import { useEffect, useState } from "react";
import { getTodos, addTodo, deleteTodo } from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    getTodos().then(response => setTodos(response.data));
  };

  const handleAdd = () => {
    addTodo({ title: title, completed: false }).then(loadTodos);
    setTitle("");
  };

  return (
    <div>
      <h2>Todo App</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id).then(loadTodos)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
