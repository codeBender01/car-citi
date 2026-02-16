import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  NewOfferType,
  OneOfferType,
} from "@/interfaces/carSpecs.interface";

export const useAddOfferType = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewOfferType,
    ): Promise<ApiResponse<OneOfferType>> => {
      const { data } = await apiClient.post(
        "/car-specs/admin-offer-type-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    mutationKey: ["addOfferType"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllOfferTypesAdmin"] });
    },
  });
};
