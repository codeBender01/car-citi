import { BASE_URL } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

import { apiClient } from "..";
import type { NewsList } from "@/interfaces/news.interface";

export const useGetNewsAdmin = () => {
  const token = localStorage.getItem("adminAccessToken");
  return useQuery({
    queryFn: async (): Promise<ApiResponse<NewsList>> => {
      const { data } = await apiClient.get<ApiResponse<NewsList>>(
        `${BASE_URL}/news/admin-all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    queryKey: ["getAllNewsAdmin"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
