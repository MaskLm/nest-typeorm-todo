import React from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../components/list/UserList";

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  if (!user || !user.admin) {
    alert("Please Login or login isn't admin");
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }
  return (
    <>
      <div>
        <h1>Admin Panel</h1>
        <UserList />
      </div>
    </>
  );
};
