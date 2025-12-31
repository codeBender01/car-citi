import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { RegionsAllRes } from "@/interfaces/regions.interface";

export const useGetRegionsAdmin = (
  locale: string,
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<RegionsAllRes>> => {
      const token = localStorage.getItem("adminAccessToken");
      const { data } = await apiClient.get<ApiResponse<RegionsAllRes>>(
        "/regions/admin-all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": locale,
          },
          params: {
            page,
            pageSize,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllRegionsAdmin", locale, page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
