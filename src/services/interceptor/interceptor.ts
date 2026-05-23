import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { QueueItem } from "@/types";
import { getCookie, removeCookie, setCookie } from "@/utils";

const api = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BASE_API"],
});

let isRefreshing = false;

let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(async (config) => {
  const token = await getCookie("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ detail: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.config.url !== "/token/" &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = await getCookie("refresh");

      try {
        const data = await axios.post<{ access: string }>(
          `${process.env["NEXT_PUBLIC_BASE_API"]}token/refresh/`,
          { refresh: refreshToken },
        );

        if (data.status === 401) {
          processQueue("error", null);
          removeCookie("access");
          removeCookie("refresh");

          window.location.href = "/login";

          return Promise.reject("error");
        } else {
          setCookie("access", data.data.access);
          api.defaults.headers.common["Authorization"] =
            `Bearer ${data.data.access}`;
          originalRequest.headers.Authorization = `Bearer ${data.data.access}`;

          processQueue(null, data.data.access);

          return api(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        removeCookie("access");
        removeCookie("refresh");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject<{ detail: string }>(error);
  },
);

export default api;
