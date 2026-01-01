import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  NewCarFuelType,
  OneCarFuelType,
} from "@/interfaces/carSpecs.interface";

export const useAddCarSpecsFuelType = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewCarFuelType
    ): Promise<ApiResponse<OneCarFuelType>> => {
      const { data } = await apiClient.post(
        "/car-specs/admin-fuel-type-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addCarSpecsFuelType"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllFuelTypes"] });
    },
  });
};