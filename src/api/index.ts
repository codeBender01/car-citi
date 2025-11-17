import { QueryClient } from "@tanstack/react-query";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});
