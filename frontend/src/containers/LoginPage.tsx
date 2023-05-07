// LoginPage.tsx
import React from "react";
import {LoginForm} from "../components/form/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  if(userString){
    alert("You are already logged in");
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }
  return (
        <div>
            <h1>Login Page</h1>
            <LoginForm  />
        </div>
    );
};

export default LoginPage;
