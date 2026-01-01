import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  NewCarSaleType,
  OneCarSaleType,
} from "@/interfaces/carSpecs.interface";

export const useAddCarSpecsSaleType = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewCarSaleType
    ): Promise<ApiResponse<OneCarSaleType>> => {
      const { data } = await apiClient.post(
        "/car-specs/admin-sale-type-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addCarSpecsSaleType"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllSaleTypes"] });
    },
  });
};