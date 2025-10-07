import axios from "axios";
//멤버 api

const api = axios.create({
  baseURL:
    "http://saksakfood-api-gateway-s-da7e9-110329723-31b4b99c070a.kr.lb.naverncp.com/api",
});

export default api;
