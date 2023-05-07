import jwtDecode from 'jwt-decode';
import axios from "axios";

export function checkIfTokenExpired(accessToken: string) {
  try {
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    // @ts-ignore
    return decoded.exp && decoded.exp < currentTime;
  } catch (error) {
    console.error('Failed to decode access token:', error);
    return false;
  }
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const decoded = jwtDecode(refreshToken);
    const currentTime = Date.now() / 1000;
    // @ts-ignore
    if(decoded.exp < currentTime){
      //清除localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      //跳转到登录页面
      window.location.href = '/login';
    }
    const response = await axios.post(
      import.meta.env.VITE_API_URL + '/auth/refresh',
      { refreshToken }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    throw error;
  }
}
