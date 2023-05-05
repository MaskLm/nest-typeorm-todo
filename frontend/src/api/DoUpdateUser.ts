import { handleAxiosError } from "../tools/functions/handleAxiosError";
import axiosInstance from "../tools/axios/AxiosInterceptorsJwt";

export async function DoUpdateUser(values: any) {
  try {
    const res = await axiosInstance.patch(
      import.meta.env.VITE_API_URL + `/user/${values.id}`,
      values
    );
    console.log("Data:", res.data);
  } catch (error) {
    handleAxiosError(error);
  }
}
