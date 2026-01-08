import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarConditionsClient } from "@/interfaces/carSpecsClient.interface";

export const useGetCarSpecsConditionsClient = (language: string = "tk") => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarConditionsClient>> => {
      const { data } = await apiClient.get<ApiResponse<CarConditionsClient>>(
        "/car-specs/car-condition-all",
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllConditionsClient", language],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
