import { handleAxiosError } from "../tools/functions/handleAxiosError";
import axiosInstance from "../tools/axios/AxiosInterceptorsJwt";

export async function DoAddTodo(values: any) {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const addTodo = { ...values, user: user };
  if (!!user) {
    try {
      const res = await axiosInstance.post(
        import.meta.env.VITE_API_URL + `/todo`,
        addTodo
      );
      console.log("Data:", res.data);
    } catch (error) {
      handleAxiosError(error);
    }
  }
}
