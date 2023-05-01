import axios from "axios";
import { handleAxiosError } from "../tools/functions/handleAxiosError";

//TODO 支持邮箱/用户名登录
interface loginUserDto {
  username: string;
  password: string;
}

export async function DoLogin(loginUser: loginUserDto) {
  try {
    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/auth/login",
      loginUser
    );
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    console.log("Data:", res.data);
  } catch (error) {
    handleAxiosError(error);
  }
}
