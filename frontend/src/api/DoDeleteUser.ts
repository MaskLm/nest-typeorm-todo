import { getUserid } from "../tools/functions/getUserid";
import axios from "axios";
import { handleAxiosError } from "../tools/functions/handleAxiosError";

export async function DoDeleteUser(deleteUserId: number){
  const userid = getUserid();
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken && userid !== -1) {
    try{
      const res = await axios.delete(
        import.meta.env.VITE_API_URL + `/user/${deleteUserId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );
      console.log("Data:", res.data);
    }catch (error) {
      handleAxiosError(error);
    }
  }
}