import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarSpecsCategoriesList } from "@/interfaces/carSpecs.interface";

export const useGetCategoriesClient = (language: string = "tk") => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarSpecsCategoriesList>> => {
      const { data } = await apiClient.get<ApiResponse<CarSpecsCategoriesList>>(
        "/car-specs/category-all",
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllCategoriesClient", language],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
