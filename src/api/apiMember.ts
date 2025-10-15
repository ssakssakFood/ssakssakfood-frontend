import useUserStore from "@/store/useUserStore";
import axios from "axios";
//멤버 api

function getAccessToken(): string | null {
  const { user } = useUserStore.getState();
  return user?.accessToken ?? localStorage.getItem("accessToken");
}
const accessToken = getAccessToken();
console.log(accessToken, "ㅌㅌ");

const api = axios.create({
  baseURL:
    "http://saksakfood-api-gateway-s-da7e9-110329723-31b4b99c070a.kr.lb.naverncp.com/api",
});
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
