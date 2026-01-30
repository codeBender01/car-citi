import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarEquipmentList } from "@/interfaces/carSpecs.interface";

export const useGetCarEquipment = (language: string = "tk") => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarEquipmentList>> => {
      const { data } = await apiClient.get<ApiResponse<CarEquipmentList>>(
        "/car-specs/car-equipment-all",
        {
          headers: {
            "Accept-Language": language,
          },
        },
      );
      return data;
    },
    queryKey: ["getAllCarEquipment"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
