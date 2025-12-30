import { BASE_URL } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

import { apiClient } from "..";
import type { NewsCategories } from "@/interfaces/news.interface";

export const useGetAllNewsCategory = () => {
  const token = localStorage.getItem("adminAccessToken");
  return useQuery({
    queryFn: async (): Promise<ApiResponse<NewsCategories>> => {
      const { data } = await apiClient.get<ApiResponse<NewsCategories>>(
        `${BASE_URL}/news/category-admin-all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllNewsCategories"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
