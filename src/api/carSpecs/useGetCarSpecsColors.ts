import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarSpecsColorsList } from "@/interfaces/carSpecs.interface";

export const useGetCarSpecsColors = (
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarSpecsColorsList>> => {
      const token = localStorage.getItem("adminAccessToken");
      const { data } = await apiClient.get<
        ApiResponse<CarSpecsColorsList>
      >("/car-specs/admin-color-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          pageSize,
        },
      });
      return data;
    },
    queryKey: ["getAllColors", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};