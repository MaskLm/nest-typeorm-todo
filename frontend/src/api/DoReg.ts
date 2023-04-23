import axios from "axios";


interface CreateUserDto {
  username: string;
  password: string;
  email: string;
}

export async function DoReg(newUser: CreateUserDto) {
  //通过axios发送请求
  try {
    const res = await axios.post(import.meta.env.VITE_API_URL + "/user/reg", newUser);
    return res.data;
  }catch (e) {
    console.error(e);
  }
}