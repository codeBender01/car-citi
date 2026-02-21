import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  NewCarEquipment,
  OneCarEquipment,
} from "@/interfaces/carSpecs.interface";

export const useAddCarSpecsEquipment = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewCarEquipment
    ): Promise<ApiResponse<OneCarEquipment>> => {
      const { data } = await apiClient.post(
        "/car-specs/admin-car-equipment-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addCarSpecsEquipment"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllEquipment"] });
    },
  });
};
