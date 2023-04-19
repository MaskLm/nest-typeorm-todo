import {FormEvent, useState} from "react";

interface LoginFormProps{
    onLogin: (username: string, password: string) => void;
}

export const LoginForm = ({ onLogin } : LoginFormProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onLogin(username, password);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}