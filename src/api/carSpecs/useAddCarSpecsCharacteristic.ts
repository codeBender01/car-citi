import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  NewCarCharacteristic,
  OneCarCharacteristic,
} from "@/interfaces/carSpecs.interface";

export const useAddCarSpecsCharacteristic = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewCarCharacteristic
    ): Promise<ApiResponse<OneCarCharacteristic>> => {
      const { data } = await apiClient.post(
        "/car-specs/admin-characteristics-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addCarSpecsCharacteristic"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCharacteristics"] });
    },
  });
};
