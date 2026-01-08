import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarConditionsClient } from "@/interfaces/carSpecsClient.interface";

export const useGetColorsClient = (language: string = "tk") => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarConditionsClient>> => {
      const { data } = await apiClient.get<ApiResponse<CarConditionsClient>>(
        "/car-specs/color-all",
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      return data;
    },
    queryKey: ["getColorsClient", language],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
