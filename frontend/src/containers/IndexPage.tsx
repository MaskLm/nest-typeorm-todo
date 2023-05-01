import React from "react";
import TodoList from "../components/list/TodoList";
import { AddTodoButton } from "../components/button/AddTodoButton";
import { useNavigate } from "react-router-dom";
import { AdminPanelButton } from "../components/button/AdminPanelButton";

export const IndexPage: React.FC = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  if (!user) {
    alert("Please Login");
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }
  return (
    <>
      {user.admin ? (
        <AdminPanelButton />
      ):(<></>)}
      <div>
        <h1>Main Page</h1>
        <TodoList />
      </div>
      <AddTodoButton />
    </>
  );
};
