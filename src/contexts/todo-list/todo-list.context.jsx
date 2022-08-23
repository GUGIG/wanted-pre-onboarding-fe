import { createContext, useCallback, useMemo, useState } from "react";

const API_URI =
  "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production";

const doFetch = async (uri, options) => {
  try {
    const response = await fetch(uri, options);

    if (!response.ok) throw response;

    if (options.method === "DELETE") return [null, null];

    const data = response.json();
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const _getTodos = async () => {
  const [todos, error] = await doFetch(API_URI + "/todos", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (error) {
    alert("todo 리스트를 받는데 문제가 발생했습니다☹️");
    return [];
  } else {
    return todos;
  }
};

/**
 * @param {{todo: string}} newTodo - new todo content
 * @returns todo list
 */
const _addTodo = async (newTodo) => {
  const [data, error] = await doFetch(API_URI + "/todos", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  if (error) {
    alert("새 todo를 작성하는데 실패했습니다. 다시 시도해주세요☹️");
    return null;
  } else {
    return data;
  }
};

/**
 * @param {{todo: string, isCompleted: boolean, id: number}} editedTodo
 * @returns updated todo object
 */
const _updateTodo = async (editedTodo, id) => {
  const [data, error] = await doFetch(API_URI + "/todos/" + id, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedTodo),
  });

  if (error) {
    alert("수정에 실패했습니다. 다시 시도해주세요☹️");
    return null;
  } else {
    return data;
  }
};

/**
 * @param {string} id - an id of a todo item
 */
const _deleteTodo = async (id) => {
  const [, error] = await doFetch(
    API_URI + "/todos/" + id,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    },
    { noJson: true }
  );

  if (error) {
    alert("삭제에 실패했습니다. 다시 시도해주세요☹️");
    return false;
  } else {
    return true;
  }
};

export const TodoListValueContext = createContext([]);
export const TodoListActionContext = createContext({
  getTodos: async () => {},
  addTodo: async () => {},
  updateTodo: async () => {},
  deleteTodo: async () => {},
});

export const TodoProvider = ({ children }) => {
  const [todos, _setTodos] = useState([]);
  const setTodos = useCallback((newTodoList) => _setTodos(newTodoList), []);

  const actions = useMemo(
    () => ({
      getTodos: async function () {
        const data = await _getTodos();
        setTodos(data);
      },
      addTodo: async function (newTodo) {
        const data = await _addTodo(newTodo);
        return data;
      },
      updateTodo: async function (editedTodo, id) {
        const data = await _updateTodo(editedTodo, id);
        return data;
      },
      deleteTodo: async function (id) {
        const successful = await _deleteTodo(id);
        return successful;
      },
    }),
    [setTodos]
  );

  return (
    <TodoListActionContext.Provider value={actions}>
      <TodoListValueContext.Provider value={todos}>
        {children}
      </TodoListValueContext.Provider>
    </TodoListActionContext.Provider>
  );
};
