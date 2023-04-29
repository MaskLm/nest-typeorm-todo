import React from "react";
import { AddTodoForm } from "../components/form/AddTodoForm";

export const IndexPage: React.FC = () => {
  return (
    <>
      <div>
        <h1>Add Todo Page</h1>
        <AddTodoForm />
      </div>
    </>
  );
};
