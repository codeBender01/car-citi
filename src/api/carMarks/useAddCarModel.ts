import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewCarModel, OneCarModel } from "@/interfaces/carMarks.interface";

export const useAddCarModel = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewCarModel
    ): Promise<ApiResponse<OneCarModel>> => {
      const { data } = await apiClient.post(
        "/cars/admin-model-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addCarModel"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getOneCarMark"] });
    },
  });
};