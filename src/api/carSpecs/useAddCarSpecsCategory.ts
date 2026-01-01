import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  NewCarSpecsCategory,
  OneCarSpecsCategory,
} from "@/interfaces/carSpecs.interface";

export const useAddCarSpecsCategory = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewCarSpecsCategory
    ): Promise<ApiResponse<OneCarSpecsCategory>> => {
      const { data } = await apiClient.post(
        "/car-specs/admin-category-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addCarSpecsCategory"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCarSpecsCategories"] });
    },
  });
};
