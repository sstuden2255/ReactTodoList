import React from "react";
import "./App.css";

export default function App() {
  const [todos, setTodos] = React.useState([
    {id: 1, text:"Wash dishes", done:false},
    {id: 2, text:"Do laundry", done:false},
    {id: 3, text:"Write code", done:false},
  ]);
  return (
    <div class="App">
      <h1>Todo List</h1>
      <TodoList setTodos={setTodos} todos={todos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  // if a todo's id is equal to the one we clicked on
  // updatethe done's value tto opposite boolean
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? {...t, done: !t.done} : t
    );
    setTodos(updatedTodos);
  }

  if (!todos.length) {
    return <p>No todos left!</p>
  }

  return  (
    <ul>
      {todos.map((todo) => (
        <li 
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : "",
            cursor: "pointer"
          }}
          key={todo.id}
        >
          {todo.text}
        <DeleteTodo todo={todo} setTodos={setTodos}/>
        </li>
      ))}
    </ul>
  );
}

function DeleteTodo({ todo, setTodos }){
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id)
      });
    }
  }
  return (
    <span
      onClick={handleDeleteTodo}
      role="button"
      style={{
        color: "red",
        fontWeight: "bold",
        marginLeft: 10,
        cursor: "pointer"
    }}>
      x
    </span>
  );
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: Math.random(),
      text,
      done:false
    };

    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    })
    inputRef.current.value = "";
  }

  return  (
    <form onSubmit={handleAddTodo}>
      <input ref={inputRef} name="addTodo" placeholder="Add todo"></input>
      <button type="submit">Submit</button>
    </form>
  );
}
