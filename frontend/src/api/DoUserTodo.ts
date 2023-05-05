import { getUserid } from "../tools/functions/getUserid";
import axiosInstance from "../tools/axios/AxiosInterceptorsJwt";

export async function DoUserTodo(currentPage: number, itemsPerPage: number) {
  const accessToken = localStorage.getItem("accessToken");
  const userid = getUserid();
  if (accessToken && userid !== -1) {
    return await axiosInstance.get(
      import.meta.env.VITE_API_URL + `/todo/user/${userid}`,
      {
        params: { page: currentPage, itemsPerPage },
      }
    );
  } else {
    throw new Error("Please Login");
  }
}
