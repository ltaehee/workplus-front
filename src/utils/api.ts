import axios from "axios";
import { API_BASE_URL } from "./constants";

const api = axios.create({
  baseURL: API_BASE_URL, // baseURL 설정 (constants.ts에서 가져옴)
  timeout: 3000,
  headers: {},
});

// 요청 인터셉터: 모든 요청에 token을 자동으로 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
    // 응답 에러 처리
    return Promise.reject(error);
  }
);

export default api;
