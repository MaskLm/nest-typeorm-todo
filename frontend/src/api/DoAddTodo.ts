import axios from "axios";
import { handleAxiosError } from "../tools/functions/handleAxiosError";

export async function DoAddTodo(values: any) {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const accessToken = localStorage.getItem("accessToken");
  const addTodo = { ...values, user: user }
  if (!!accessToken && !!user) {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + `/todo`, addTodo,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Data:", res.data);
    } catch (error) {
      handleAxiosError(error);
    }
  }
}