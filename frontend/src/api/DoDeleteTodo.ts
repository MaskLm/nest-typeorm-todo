import { getUserid } from "../tools/functions/getUserid";
import { handleAxiosError } from "../tools/functions/handleAxiosError";
import axiosInstance from "../tools/axios/AxiosInterceptorsJwt";

export async function DoDeleteTodo(todoId: number) {
  const userid = getUserid();
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken && userid !== -1) {
    try {
      const res = await axiosInstance.delete(
        import.meta.env.VITE_API_URL + `/todo/${todoId}`
      );
      console.log("Data:", res.data);
    } catch (error) {
      handleAxiosError(error);
    }
  }
}
