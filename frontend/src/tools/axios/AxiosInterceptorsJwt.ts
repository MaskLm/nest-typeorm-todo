import axios from 'axios';
import { checkIfTokenExpired, refreshAccessToken } from "../functions/jwtTools";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken && refreshToken) {
    const isTokenExpired = checkIfTokenExpired(accessToken);

    if (isTokenExpired) {
      try {
        const ans = await refreshAccessToken(refreshToken);
        const newAccessToken = ans.accessToken;
        localStorage.setItem('accessToken', ans.refreshToken);
        localStorage.setItem('refreshToken', ans.refreshToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        console.error('Failed to refresh access token:', error);
      }
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

export default axiosInstance;
