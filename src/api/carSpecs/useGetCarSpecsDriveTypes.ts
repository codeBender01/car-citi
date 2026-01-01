import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarSpecsDriveTypesList } from "@/interfaces/carSpecs.interface";

export const useGetCarSpecsDriveTypes = (
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarSpecsDriveTypesList>> => {
      const token = localStorage.getItem("adminAccessToken");
      const { data } = await apiClient.get<ApiResponse<CarSpecsDriveTypesList>>(
        "/car-specs/admin-drive-type-all",
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
    queryKey: ["getAllDriveTypes", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
