import { Routes, Route } from "react-router-dom";

import { TodoProvider } from "../contexts/todo-list";

import SignInUpPage from "./sign-in-up/sign-in-up.page";
import TodoPage from "./todo/todo.page";

const Pages = () => (
  <Routes>
    <Route path="/" element={<SignInUpPage />} />
    <Route
      path="/todo"
      element={
        <TodoProvider>
          <TodoPage />
        </TodoProvider>
      }
    />
    <Route path="/test" element={<div>hi</div>} />
  </Routes>
);

export default Pages;
