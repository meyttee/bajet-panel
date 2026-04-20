import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BASE_API"],
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<{ detail: string }>): Promise<{ detail: string }> => {
    if (error.code === "401") {
      //TODO: HANDLE REFRESH TOKEN
      console.error(401);
    }
    return Promise.reject<{ detail: string }>(error);
  },
);

export default api;
