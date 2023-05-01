import { getUserid } from "../tools/functions/getUserid";
import axios from "axios";
import { handleAxiosError } from "../tools/functions/handleAxiosError";

export async function DoUpdateTodo(values: any){
  const userid = getUserid();
  const accessToken = localStorage.getItem("accessToken");
  const updateTodo = {...values, user: userid}
  if (accessToken && userid !== -1) {
    try{
      const res = await axios.patch(
        import.meta.env.VITE_API_URL + `/todo/${updateTodo.id}`,updateTodo,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Data:", res.data);
    }catch (error) {
      handleAxiosError(error);
    }
  }
}