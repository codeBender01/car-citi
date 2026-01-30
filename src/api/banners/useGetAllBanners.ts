import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { BannersList } from "@/interfaces/banners.interface";

export const useGetBanners = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<BannersList>> => {
      const token = localStorage.getItem("adminAccessToken");
      const { data } = await apiClient.get<ApiResponse<BannersList>>(
        "/banners/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            pageSize,
          },
        },
      );
      return data;
    },
    queryKey: ["getAllBanners", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
