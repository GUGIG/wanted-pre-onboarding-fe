import { useContext } from "react";

import TodoListItem from "../todo-list-item";

import { TodoListValueContext } from "../../contexts/todo-list";

import "./style.scss";

const TodoList = () => {
  const todos = useContext(TodoListValueContext);
  return (
    <ul className="todo-list">
      {todos.map((todoItem) => {
        const { todo, isCompleted, id } = todoItem;
        return (
          <TodoListItem
            key={id}
            todo={todo}
            isCompleted={isCompleted}
            id={id}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
