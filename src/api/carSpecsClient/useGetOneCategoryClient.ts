import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { OneCarSpecsCategory } from "@/interfaces/carSpecs.interface";

export const useGetOneCarSpecsCategoryClient = (
  catId: string,
  page: number = 1,
  pageSize: number = 10,
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<OneCarSpecsCategory>> => {
      const { data } = await apiClient.get<ApiResponse<OneCarSpecsCategory>>(
        `/carcity/car-specs/category-details/${catId}`,
        {
          params: {
            page,
            pageSize,
          },
        },
      );
      return data;
    },
    queryKey: ["getOneCarSpecsCategoryClient", catId, page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!catId,
  });
};
