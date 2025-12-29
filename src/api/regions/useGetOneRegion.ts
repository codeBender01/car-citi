import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { OneRegion } from "@/interfaces/regions.interface";

export const useGetOneRegion = (regionId: string) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<OneRegion>> => {
      const token = localStorage.getItem("adminAccessToken");
      const { data } = await apiClient.get<ApiResponse<OneRegion>>(
        `/regions/admin-details/${regionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    queryKey: ["getOneRegion", regionId],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!regionId,
  });
};
