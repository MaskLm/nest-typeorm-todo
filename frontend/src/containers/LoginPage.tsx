// LoginPage.tsx
import React from "react";
import {LoginForm} from "./../components/form/LoginForm";

const LoginPage: React.FC = () => {
    const handleLogin = (username: string, password: string) => {
        // 在这里处理登录逻辑，例如发送请求到后端验证登录凭据
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <div>
            <h1>Login Page</h1>
            <LoginForm onLogin={handleLogin} />
        </div>
    );
};

export default LoginPage;
