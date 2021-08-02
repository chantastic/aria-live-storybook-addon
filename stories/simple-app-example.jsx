import React from "react";
import { useAriaLive, PoliteAriaLive } from "use-aria-live";

export default function SimpleAppExmaple() {
  let [announcement, announce] = useAriaLive();
  let [todos, updateTodos] = React.useState([]);

  function appendTodo(title) {
    updateTodos([...todos, { title, createdAt: Date.now() }]);
    announce(`Todo created: ${title}`);
  }

  function removeTodoWithCreatedAt(createdAt) {
    updateTodos(todos.filter((item) => item.createdAt !== createdAt));
    announce(`Todo removed`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    appendTodo(event.currentTarget.title.value);
    event.currentTarget.reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" id="todo_title" />
        <button type="submit">Add todo</button>
      </form>

      <ul>
        {todos.map((item) => (
          <li key={item.createdAt}>
            {item.title}{" "}
            <button type="button">
              <span
                role="img"
                aria-label="Delete item"
                onClick={() => removeTodoWithCreatedAt(item.createdAt)}
              >
                🗑
              </span>
            </button>
          </li>
        ))}
      </ul>

      <PoliteAriaLive>{announcement}</PoliteAriaLive>
    </>
  );
}
