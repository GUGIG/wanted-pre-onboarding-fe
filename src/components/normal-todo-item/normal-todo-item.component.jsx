import { useState, useEffect, useContext, useCallback } from "react";
import Button from "../button";

import { TodoListActionContext } from "../../contexts/todo-list";

import "./style.scss";

const NormalTodoItem = ({ onSwitch, todo, isCompleted, id }) => {
  const [checkmark, setCheckmark] = useState("✔️");
  useEffect(() => {
    setCheckmark(isCompleted ? "✅" : "✔️");
  }, [isCompleted]);

  const { getTodos, deleteTodo } = useContext(TodoListActionContext);
  const deleteTodoItem = useCallback(async () => {
    const successful = await deleteTodo(id);
    if (successful) getTodos();
  }, [deleteTodo, getTodos, id]);

  return (
    <>
      <span className="normal-todo-item__checkmark">{checkmark}</span>
      <span
        className={`normal-todo-item__todo${isCompleted ? "--completed" : ""}`}
      >
        {todo}
      </span>
      <div className="normal-todo-item__button-container">
        <Button onClick={onSwitch}>{"✏️"}</Button>
        <Button onClick={deleteTodoItem}>{"🗑"}</Button>
      </div>
    </>
  );
};

export default NormalTodoItem;
