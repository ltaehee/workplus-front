import axios from "axios";
import { API_BASE_URL } from "./constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {},
});

// 요청 인터셉터: 모든 요청에 token을 자동으로 추가
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    const { token } = user && JSON.parse(user); /* try catch */
    if (token) {
      config.headers.authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 응답 인터셉터: 응답을 전처리하거나 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 요청 오류:", error);
    return Promise.reject(error);
  }
);

export default api;
