import useUserStore from "@/store/useUserStore";
import axios from "axios";
//카탈로그 apiC

function getAccessToken(): string | null {
  const { user } = useUserStore.getState();
  return user?.accessToken ?? localStorage.getItem("accessToken");
}
const accessToken = getAccessToken();
console.log(accessToken, "ㅌㅌ");

const apiC = axios.create({
  baseURL: import.meta.env.VITE_CATALOG_SERVER_URL,
});
apiC.interceptors.request.use(
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

export default apiC;
