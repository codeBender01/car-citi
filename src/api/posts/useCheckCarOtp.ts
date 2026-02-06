import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CheckCarOtpReq, OnePost } from "@/interfaces/posts.interface";

export const useCheckCarOtp = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  return useMutation({
    mutationFn: async (
      payload: CheckCarOtpReq,
    ): Promise<ApiResponse<OnePost>> => {
      const { data } = await apiClient.post(`/auth/check-otp-car`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["checkCarOtp"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getOnePost", "getAllPosts"],
      });
    },
  });
};
