import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarSpecsCategoriesList } from "@/interfaces/carSpecs.interface";

export const useGetCarSpecsCategories = (
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarSpecsCategoriesList>> => {
      const token = localStorage.getItem("adminAccessToken");

      const { data } = await apiClient.get<ApiResponse<CarSpecsCategoriesList>>(
        "/car-specs/admin-category-all",
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
    queryKey: ["getAllCarSpecsCategories", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
