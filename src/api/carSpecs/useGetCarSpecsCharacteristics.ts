import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarSpecsCharacteristicsList } from "@/interfaces/carSpecs.interface";

export const useGetCarSpecsCharacteristics = (
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarSpecsCharacteristicsList>> => {
      const token = localStorage.getItem("adminAccessToken");
      const { data } = await apiClient.get<
        ApiResponse<CarSpecsCharacteristicsList>
      >("/car-specs/admin-characteristic-all", {
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
    queryKey: ["getAllCharacteristics", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};