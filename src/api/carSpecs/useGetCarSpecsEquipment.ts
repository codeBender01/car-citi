import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarEquipmentList } from "@/interfaces/carSpecs.interface";

export const useGetCarSpecsEquipment = (
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarEquipmentList>> => {
      const token = localStorage.getItem("adminAccessToken");
      const { data } = await apiClient.get<ApiResponse<CarEquipmentList>>(
        "/car-specs/admin-car-equipment-all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            pageSize,
            search: search || undefined,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllEquipment", page, pageSize, search],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
