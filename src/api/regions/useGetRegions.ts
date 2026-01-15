import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { RegionsAllRes } from "@/interfaces/regions.interface";

export const useGetRegions = (lang: string) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<RegionsAllRes>> => {
      const { data } = await apiClient.get<ApiResponse<RegionsAllRes>>(
        "/regions/all",

        {
          headers: {
            "Accept-Language": lang,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllRegions"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
