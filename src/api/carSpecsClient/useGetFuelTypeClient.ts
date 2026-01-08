import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { DriveTypeClient } from "@/interfaces/carSpecsClient.interface";

export const useGetFuelTypeClient = (language: string = "tk") => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<DriveTypeClient>> => {
      const { data } = await apiClient.get<ApiResponse<DriveTypeClient>>(
        "/car-specs/fuel-type-all",
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      return data;
    },
    queryKey: ["getFuelTypeClient", language],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
