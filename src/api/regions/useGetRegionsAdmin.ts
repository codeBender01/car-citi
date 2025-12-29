import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { RegionsAllRes } from "@/interfaces/regions.interface";

export const useGetRegionsAdmin = (locale: string) => {
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
        }
      );
      return data;
    },
    queryKey: ["getAllRegionsAdmin", locale],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
