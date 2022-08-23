import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

import { TodoListActionContext } from "../../contexts/todo-list";

import Button from "../../components/button";
import Input from "../../components/input";
import TodoList from "../../components/todo-list/todo-list.component";

import "./style.scss";

const TodoPage = () => {
  const localToken = localStorage.getItem("token");

  // load todo list on mouted
  const { getTodos, addTodo } = useContext(TodoListActionContext);
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const [todoText, setTodoText] = useState("");
  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    setTodoText(value);
  };

  const addTodoItem = async () => {
    if (!todoText) return;

    const data = await addTodo({ todo: todoText });
    if (data) {
      getTodos();
      setTodoText("");
    }
  };

  return (
    <>
      {!localToken && <Navigate to="/" replace />}
      <div className="todo-list-page">
        <h1 className="todo-list-page__title">this is todo list page</h1>
        <div className="todo-list-page__input">
          <Input type="text" value={todoText} onChange={handleInputChange} />
          <Button onClick={addTodoItem}>add item</Button>
        </div>
        <TodoList />
      </div>
    </>
  );
};

export default TodoPage;
