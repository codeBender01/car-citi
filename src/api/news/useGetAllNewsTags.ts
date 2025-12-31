import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewsTags } from "@/interfaces/news.interface";

export const useGetAllNewsTags = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<NewsTags>> => {
      const token = localStorage.getItem("adminAccessToken");

      const { data } = await apiClient.get<ApiResponse<NewsTags>>(
        "/news/tag-admin-all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            pageSize,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllNewsTags", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
