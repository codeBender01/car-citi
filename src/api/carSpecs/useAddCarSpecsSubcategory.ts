import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  NewCarSpecsSubcategory,
  OneCarSpecsSubcategory,
} from "@/interfaces/carSpecs.interface";

export const useAddCarSpecsSubcategory = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewCarSpecsSubcategory
    ): Promise<ApiResponse<OneCarSpecsSubcategory>> => {
      const { data } = await apiClient.post(
        "/car-specs/admin-subcategory-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addCarSpecsSubcategory"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getOneCarSpecsCategory"] });
    },
  });
};
