import { BASE_URL } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

import { apiClient } from "..";
import type { HomeData } from "@/interfaces/home.interface";

export const useGetHomeClient = () => {
  const token = localStorage.getItem("accessToken");
  return useQuery({
    queryFn: async (): Promise<ApiResponse<HomeData>> => {
      const { data } = await apiClient.get<ApiResponse<HomeData>>(
        `${BASE_URL}/home/client`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    queryKey: ["getHomeClient"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
