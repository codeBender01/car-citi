import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  NewCarCondition,
  OneCarCondition,
} from "@/interfaces/carSpecs.interface";

export const useAddCarSpecsCondition = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewCarCondition
    ): Promise<ApiResponse<OneCarCondition>> => {
      const { data } = await apiClient.post(
        "/car-specs/admin-car-condition-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addCarSpecsCondition"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllConditions"] });
    },
  });
};
