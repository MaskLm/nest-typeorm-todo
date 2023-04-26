import axios, { AxiosError } from "axios";
import { ResponseError } from "../tools/interfaces/ResponseError";

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
    console.log("Data:", res.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error("Error status code:", axiosError.response.status);
      console.error("Error data:", axiosError.response.data);
      // 向上抛出信息
      const responseError: ResponseError = axiosError.response
        .data as ResponseError;
      throw responseError.message;
    } else {
      throw "Please Contact Admin";
    }
  }
}
