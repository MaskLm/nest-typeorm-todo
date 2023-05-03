import { getUserid } from "../tools/functions/getUserid";
import axios from "axios";
import { handleAxiosError } from "../tools/functions/handleAxiosError";

export async function DoUpdateUser(values: any){
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try{
      const res = await axios.patch(
        import.meta.env.VITE_API_URL + `/user/${values.id}`,values,
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