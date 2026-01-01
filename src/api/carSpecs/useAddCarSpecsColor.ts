import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  NewCarColor,
  OneCarColor,
} from "@/interfaces/carSpecs.interface";

export const useAddCarSpecsColor = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewCarColor
    ): Promise<ApiResponse<OneCarColor>> => {
      const { data } = await apiClient.post(
        "/car-specs/admin-color-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addCarSpecsColor"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllColors"] });
    },
  });
};