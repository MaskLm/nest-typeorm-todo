import axios, { AxiosError } from "axios";

interface ResponseError {
  message: string;
}

export function handleAxiosError(error: any): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error("Error status code:", axiosError.response.status);
      console.error("Error data:", axiosError.response.data);
      const responseError: ResponseError = axiosError.response.data as ResponseError;
      throw responseError.message;
    } else {
      throw "Please Contact Admin";
    }
  } else {
    throw error;
  }
}