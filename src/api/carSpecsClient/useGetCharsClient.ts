import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarCharsClient } from "@/interfaces/carSpecsClient.interface";

export const useGetCharsClient = (language: string = "tk") => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarCharsClient>> => {
      const { data } = await apiClient.get<ApiResponse<CarCharsClient>>(
        "/car-specs/characteristics-all",
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      return data;
    },
    queryKey: ["getCharsClient", language],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
