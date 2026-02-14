import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import i18n from "../i18n";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  paramsSerializer: {
    indexes: null,
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const currentLanguage = i18n.language || "ru";
    config.headers["Accept-Language"] = currentLanguage;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});
