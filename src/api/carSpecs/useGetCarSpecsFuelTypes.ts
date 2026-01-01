import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarSpecsFuelTypesList } from "@/interfaces/carSpecs.interface";

export const useGetCarSpecsFuelTypes = (
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarSpecsFuelTypesList>> => {
      const token = localStorage.getItem("adminAccessToken");
      const { data } = await apiClient.get<ApiResponse<CarSpecsFuelTypesList>>(
        "/car-specs/admin-fuel-type-all",
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
    queryKey: ["getAllFuelTypes", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};