import axios from "axios";
import { getUserid } from "../tools/functions/getUserid";

export async function DoUser(currentPage: number, itemsPerPage: number) {
  const accessToken = localStorage.getItem("accessToken");
  const userid = getUserid();
  if (accessToken && userid !== -1) {
    return await axios.get(
      import.meta.env.VITE_API_URL + `/user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {page: currentPage, itemsPerPage},
      }
    );
  }else{
    throw new Error('Please Login');
  }
}
