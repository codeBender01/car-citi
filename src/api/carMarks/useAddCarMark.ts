import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewCarMark, OneCarMark } from "@/interfaces/carMarks.interface";

export const useAddCarMark = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewCarMark
    ): Promise<ApiResponse<OneCarMark>> => {
      const { data } = await apiClient.post(
        "/car-marks/admin-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addCarMark"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCarMarks"] });
    },
  });
};