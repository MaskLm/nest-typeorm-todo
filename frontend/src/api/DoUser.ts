import { getUserid } from "../tools/functions/getUserid";
import axiosInstance from "../tools/axios/AxiosInterceptorsJwt";

export async function DoUser(currentPage: number, itemsPerPage: number) {
  const userid = getUserid();
  if (userid !== -1) {
    return await axiosInstance.get(import.meta.env.VITE_API_URL + `/user`, {
      params: { page: currentPage, itemsPerPage },
    });
  } else {
    throw new Error("Please Login");
  }
}
