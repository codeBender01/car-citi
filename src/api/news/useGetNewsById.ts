import { useQuery } from "@tanstack/react-query";
import { BASE_URL, apiClient } from "..";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { OneNews } from "@/interfaces/news.interface";

export const useGetNewsById = (id: string) => {
  const token = localStorage.getItem("accessToken");
  return useQuery({
    queryFn: async (): Promise<ApiResponse<OneNews>> => {
      const { data } = await apiClient.get<ApiResponse<OneNews>>(
        `${BASE_URL}/news/details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    queryKey: ["getNewsById", id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
