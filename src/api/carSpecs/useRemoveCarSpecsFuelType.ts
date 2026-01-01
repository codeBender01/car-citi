import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

export const useRemoveCarSpecsFuelType = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (payload: string): Promise<ApiResponse<string>> => {
      const { data } = await apiClient.delete(
        `/car-specs/admin-fuel-type-remove/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["removeCarSpecsFuelType"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllFuelTypes"] });
    },
  });
};