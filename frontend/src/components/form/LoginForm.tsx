import { useNavigate } from "react-router-dom";
import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DoLogin } from "../../api/DoLogin";

// 定义一个 Yup 验证模式
const validationSchema = Yup.object({
  username: Yup.string().min(6, 'Username must be at least 6 characters').required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(import.meta.env.VITE_API_URL + "/auth/login");
      console.log('Form values:', values);
      try{
        await DoLogin(values);
        alert("登陆成功");
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
      catch (error){
        alert(error);
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password && formik.touched.password && (
        <p>{formik.errors.password}</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};



/*
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
}*/
