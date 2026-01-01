import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarSpecsConditionsList } from "@/interfaces/carSpecs.interface";

export const useGetCarSpecsConditions = (
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarSpecsConditionsList>> => {
      const token = localStorage.getItem("adminAccessToken");

      const { data } = await apiClient.get<ApiResponse<CarSpecsConditionsList>>(
        "/car-specs/admin-car-condition-all",
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
    queryKey: ["getAllConditions", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
