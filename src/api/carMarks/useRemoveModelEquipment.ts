import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

interface ModelEquipmentPayload {
  carmodelId: string;
  equipmentId: string;
}

export const useRemoveModelEquipment = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: ModelEquipmentPayload
    ): Promise<ApiResponse<string>> => {
      const { data } = await apiClient.post(
        "/cars/admin-model-equipments-remove",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["removeModelEquipment"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getOneCarMark"] });
    },
  });
};
