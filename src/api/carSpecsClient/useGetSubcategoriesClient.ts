import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { SubcategoriesClient } from "@/interfaces/carSpecsClient.interface";

export const useGetSubcategoriesClient = (language: string = "tk") => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<SubcategoriesClient>> => {
      const { data } = await apiClient.get<ApiResponse<SubcategoriesClient>>(
        "/car-specs/subcategory-all",
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllSubcategoriesClient", language],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
