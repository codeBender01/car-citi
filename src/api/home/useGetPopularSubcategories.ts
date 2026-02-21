import { BASE_URL } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

import { apiClient } from "..";
import type { StatsResp } from "@/interfaces/home.interface";

export const useGetPopularSubcategories = (language: string) => {
  const token = localStorage.getItem("accessToken");
  return useQuery({
    queryFn: async (): Promise<ApiResponse<StatsResp>> => {
      const { data } = await apiClient.get<ApiResponse<StatsResp>>(
        `${BASE_URL}/cars/popular-subcategories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": language,
          },
        },
      );
      return data;
    },
    queryKey: ["getPopularSubcategories"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
