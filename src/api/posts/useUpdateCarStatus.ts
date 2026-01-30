import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

interface UpdateCarStatusPayload {
  carId: string;
  status: "checking" | "confirmed" | "rejected";
}

export const useUpdateCarStatus = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");

  return useMutation({
    mutationFn: async (
      payload: UpdateCarStatusPayload,
    ): Promise<ApiResponse<any>> => {
      const { data } = await apiClient.patch(
        `/cars/car-status`,
        { status: payload.status, carId: payload.carId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCars"] });
    },
    mutationKey: ["updateCarStatus"],
  });
};
