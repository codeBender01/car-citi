import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarSpecsSubcategoriesList } from "@/interfaces/carSpecs.interface";

export const useGetSubcategories = (
  page: number = 1,
  pageSize: number = 10,
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarSpecsSubcategoriesList>> => {
      const token = localStorage.getItem("adminAccessToken");

      const { data } = await apiClient.get<ApiResponse<CarSpecsSubcategoriesList>>(
        "/car-specs/admin-subcategory-all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            pageSize,
          },
        },
      );
      return data;
    },
    queryKey: ["getAllSubcategories", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
