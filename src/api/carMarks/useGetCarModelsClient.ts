import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarModelsClientRes } from "@/interfaces/carMarks.interface";

export const useGetCarModelsClient = (
  page: number = 1,
  pageSize: number = 10,
  language: string
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarModelsClientRes>> => {
      const { data } = await apiClient.get<ApiResponse<CarModelsClientRes>>(
        "/cars/models-all",

        {
          params: {
            page,
            pageSize,
          },
          headers: {
            "Accept-Language": language,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllCarModels", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
