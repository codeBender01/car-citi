import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewsTags } from "@/interfaces/news.interface";

export const useGetAllNewsTags = () => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<NewsTags>> => {
      const token = localStorage.getItem("adminAccessToken");

      const { data } = await apiClient.get<ApiResponse<NewsTags>>(
        "/news/tag-admin-all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllNewsTags"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
