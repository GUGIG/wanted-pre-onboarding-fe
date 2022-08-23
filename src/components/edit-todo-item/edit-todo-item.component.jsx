import { useEffect, useState, useContext, useCallback } from "react";

import { TodoListActionContext } from "../../contexts/todo-list";

import Input from "../input";
import Button from "../button";

import "./style.scss";

const EditTodoItem = ({ onSwitch, todo, isCompleted, id }) => {
  const [newTodo, setNewTodo] = useState({ todo, isCompleted });

  const toggleCompleted = () => {
    setNewTodo((prev) => ({
      ...prev,
      isCompleted: !prev.isCompleted,
    }));
  };

  const handleChange = (e) => {
    const { value } = e.currentTarget;
    setNewTodo((prev) => ({
      ...prev,
      todo: value,
    }));
  };

  const [checkmark, setCheckmark] = useState(isCompleted ? "✅" : "✔️");
  useEffect(() => {
    setCheckmark(newTodo.isCompleted ? "✅" : "✔️");
  }, [newTodo.isCompleted]);

  const { getTodos, updateTodo } = useContext(TodoListActionContext);
  const edit = useCallback(async () => {
    const data = await updateTodo(newTodo, id);
    if (data) {
      getTodos();
      onSwitch();
    }
  }, [getTodos, id, newTodo, onSwitch, updateTodo]);

  return (
    <>
      <Button onClick={toggleCompleted}>{checkmark}</Button>
      <Input
        className="edit-todo-item__input"
        type="text"
        value={newTodo.todo}
        onChange={handleChange}
      />
      <div className="edit-todo-item__button-container">
        <Button onClick={edit} color="positive">
          OK
        </Button>
        <Button onClick={onSwitch} color="negative">
          Back
        </Button>
      </div>
    </>
  );
};

export default EditTodoItem;
