import { BASE_URL } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

import { apiClient } from "..";
import type { StatsResp } from "@/interfaces/home.interface";

export const useGetHomeStats = () => {
  const token = localStorage.getItem("accessToken");
  return useQuery({
    queryFn: async (): Promise<ApiResponse<StatsResp>> => {
      const { data } = await apiClient.get<ApiResponse<StatsResp>>(
        `${BASE_URL}/home/client-counts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    queryKey: ["getHomeClient"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
