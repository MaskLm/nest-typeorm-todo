import { getUserid } from "../tools/functions/getUserid";
import axios, { AxiosError } from "axios";
import { ResponseError } from "../tools/interfaces/ResponseError";

export async function DoAddTodo(values: any){
  const userid = getUserid();
  const accessToken = localStorage.getItem("accessToken");
  const addTodo = {...values, user: userid}
  if (accessToken && userid !== -1) {
    try{
      const res = await axios.post(
        import.meta.env.VITE_API_URL + `/todo`,addTodo,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Data:", res.data);
    }catch (error) {
      if (axios.isAxiosError(error)) {
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
      } else {
        throw error;
      }
    }
  }
}