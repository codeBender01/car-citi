import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { DriveTypeClient } from "@/interfaces/carSpecsClient.interface";

export const useGetSaleTypeClient = (language: string = "tk") => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<DriveTypeClient>> => {
      const { data } = await apiClient.get<ApiResponse<DriveTypeClient>>(
        "/car-specs/sale-type-all",
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      return data;
    },
    queryKey: ["getSaleTypeClient", language],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
