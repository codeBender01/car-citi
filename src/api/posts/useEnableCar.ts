import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

export const useEnableCar = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (payload: string): Promise<ApiResponse<string>> => {
      const { data } = await apiClient.put(
        `/cars/enable/` + payload,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    mutationKey: ["enableCar"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCars"] });
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
    },
  });
};
