import { getUserid } from "../tools/functions/getUserid";
import { handleAxiosError } from "../tools/functions/handleAxiosError";
import axiosInstance from "../tools/axios/AxiosInterceptorsJwt";

export async function DoUpdateTodo(values: any) {
  const userid = getUserid();
  const updateTodo = { ...values, user: userid };
  if ( userid !== -1) {
    try {
      const res = await axiosInstance.patch(
        import.meta.env.VITE_API_URL + `/todo/${updateTodo.id}`,
        updateTodo
      );
      console.log("Data:", res.data);
    } catch (error) {
      handleAxiosError(error);
    }
  }
}
