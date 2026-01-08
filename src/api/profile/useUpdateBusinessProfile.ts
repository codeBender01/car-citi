import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { UpdateBusinessProfileReq } from "@/interfaces/profile.interface";

export const useUpdateBusinessProfile = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  return useMutation({
    mutationFn: async (
      payload: UpdateBusinessProfileReq
    ): Promise<ApiResponse<any>> => {
      const { data } = await apiClient.put("/auth/business-profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["updateBusinessProfile"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
    },
  });
};
