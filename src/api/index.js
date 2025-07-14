// api 호출 인덱스 파일
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터를 통해 매번 토큰을 동적으로 추가시킨다.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // 두번째 인자 : 에러발생 시 처리
  (error) => Promise.reject(error)
);

export default api;
