import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { OneCarSpecsCategory } from "@/interfaces/carSpecs.interface";

export const useGetOneCarSpecsCategory = (
  catId: string,
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<OneCarSpecsCategory>> => {
      const token = localStorage.getItem("adminAccessToken");
      const { data } = await apiClient.get<ApiResponse<OneCarSpecsCategory>>(
        `/car-specs/admin-category-details/${catId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            pageSize,
          },
        }
      );
      return data;
    },
    queryKey: ["getOneCarSpecsCategory", catId, page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!catId,
  });
};
