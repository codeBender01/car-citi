import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  NewCarTransmission,
  OneCarTransmission,
} from "@/interfaces/carSpecs.interface";

export const useAddCarSpecsTransmission = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewCarTransmission
    ): Promise<ApiResponse<OneCarTransmission>> => {
      const { data } = await apiClient.post(
        "/car-specs/admin-transmission-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addCarSpecsTransmission"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllTransmissions"] });
    },
  });
};