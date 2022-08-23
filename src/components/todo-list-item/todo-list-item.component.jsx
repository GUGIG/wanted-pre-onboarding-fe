import { useState, useCallback, memo } from "react";

import NormalItem from "../normal-todo-item/normal-todo-item.component";
import EditItem from "../edit-todo-item/edit-todo-item.component";

import "./style.scss";

const TodoListItem = ({ todo, isCompleted, id }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const switchToEditMode = useCallback(() => setIsEditMode(true), []);
  const switchToNormalMode = useCallback(() => setIsEditMode(false), []);

  return (
    <li className="todo-list-item">
      {isEditMode ? (
        <EditItem
          onSwitch={switchToNormalMode}
          todo={todo}
          isCompleted={isCompleted}
          id={id}
        />
      ) : (
        <NormalItem
          onSwitch={switchToEditMode}
          todo={todo}
          isCompleted={isCompleted}
          id={id}
        />
      )}
    </li>
  );
};

export default memo(TodoListItem);
