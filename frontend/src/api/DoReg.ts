import axios, { AxiosError } from "axios";
import { ResponseError } from "../tools/interfaces/ResponseError";


interface CreateUserDto {
  username: string;
  password: string;
  email: string;
}

export async function DoReg(newUser: CreateUserDto) {
  //通过axios发送请求
  try {
    const res = await axios.post(import.meta.env.VITE_API_URL + "/user/reg", newUser);
    console.log('Data:', res.data);
  }catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error status code:', axiosError.response.status);
      console.error('Error data:', axiosError.response.data);
      // 向上抛出信息
      const responseError:ResponseError = axiosError.response.data as ResponseError;
      throw responseError.message;
    } else {
      throw 'Please Contact Admin';
    }

    /*else if (axiosError.request) {
      console.error('Network error:', axiosError.message);
      // 向上抛出
      throw axiosError.message;
    } else {
      console.error('Axios or programming error:', axiosError.message);
      // 向上抛出
      throw axiosError.message;
    }*/
  }
}