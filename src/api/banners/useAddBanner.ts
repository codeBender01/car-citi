import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewBanner, OneBanner } from "@/interfaces/banners.interface";

export const useAddBanner = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (payload: NewBanner): Promise<ApiResponse<OneBanner>> => {
      const { data } = await apiClient.post("/banners/upsert", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["addBanner"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllBanners"] });
    },
  });
};
