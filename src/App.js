import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header/header.js';
import Form from './components/form/form.js';
import EditIcon from './images/edit-icon.png';
import DeleteIcon from './images/delete-icon.png';
import CompleteIcon from './images/complete-icon.png';

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
    if (currentText.trim()) {
      setTodos(todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, text: currentText };
        }
        return todo;
      }));
      setEditingTodo(null);
    } else {
      alert('Текст не может быть пустым');
    }
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      saveTodo(todo.id);
                    }
                  }}
                />
              ) : (
                todo.text
              )}
              <div className="btn-box">
                <button className="delete" onClick={e => {
                  e.stopPropagation();
                  removeTodo(todo.id);
                }}><img src={DeleteIcon} alt="Удалить" /></button>
                <img className="complete" src={CompleteIcon} onClick={() => toggleTodo(todo.id)} alt="Завершить" />
                <img className="edit" onClick={() => startEditing(todo)} src={EditIcon} alt="Редактировать" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
