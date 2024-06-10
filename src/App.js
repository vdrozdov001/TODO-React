import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header/header.js';
import Form from './components/form/form.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [currentText, setCurrentText] = useState('');

  const putTodo = (value) => {
    if (value) {
      setTodos(prevTodos => [...prevTodos, { id: Date.now(), text: value, done: false }]);
    } else {
      alert('Введите текст');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        done: !todo.done
      };
    }));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setCurrentText(todo.text);
  };

  const handleTextChange = (e) => {
    setCurrentText(e.target.value);
  };

  const saveTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: currentText };
      }
      return todo;
    }));
    setEditingTodo(null);
  };

  return (
    <div className="wrapper">
      <Header />
      <Form putTodo={putTodo} />
      <ul className="todos">
        {todos.map(todo => {
          const isEditing = editingTodo === todo.id;
          return (
            <li className={todo.done ? "todo done" : "todo"} key={todo.id}>
              {isEditing ? (
                <input
                  type="text"
                  value={currentText}
                  onChange={handleTextChange}
                  onBlur={() => saveTodo(todo.id)}
                />
              ) : (
                todo.text
              )}
              <div className="btn-box">
                <button className="delete" onClick={e => {
                  e.stopPropagation();
                  removeTodo(todo.id);
                }}>X</button>
                <button className="complete" onClick={() => toggleTodo(todo.id)}>Complete</button>
                <button className="edit" onClick={() => startEditing(todo)}>Edit</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
