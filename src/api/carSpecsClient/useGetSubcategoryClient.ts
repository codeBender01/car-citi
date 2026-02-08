import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarSpecsSubcategoriesList } from "@/interfaces/carSpecs.interface";

export const useGetSubcategoriesAll = (language: string = "tk") => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarSpecsSubcategoriesList>> => {
      const { data } = await apiClient.get<
        ApiResponse<CarSpecsSubcategoriesList>
      >("/car-specs/subcategory-all", {
        headers: {
          "Accept-Language": language,
        },
      });
      return data;
    },
    queryKey: ["getAllCategoriesClient", language],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
