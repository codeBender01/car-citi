import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { VerifyCar } from "@/interfaces/posts.interface";

export const useVerifyCar = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (payload: VerifyCar): Promise<ApiResponse<string>> => {
      const { data } = await apiClient.put(`/cars/verifiedStatus`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["enableCar"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCars"] });
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
    },
  });
};
