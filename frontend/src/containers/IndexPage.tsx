import React from "react";
import TodoList from "../components/list/TodoList";
import { AddTodoButton } from "../components/button/AddTodoButton";

export const IndexPage: React.FC = () => {
  return (
    <>
      <div>
        <h1>Main Page</h1>
        <TodoList />
      </div>
      <AddTodoButton />
    </>
  );
};
