import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CheckOtp, CheckOtpRes } from "@/interfaces/auth.interface";

export const useCheckOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: CheckOtp
    ): Promise<ApiResponse<CheckOtpRes>> => {
      const { data } = await apiClient.post("/auth/check-otp", payload);
      return data;
    },
    mutationKey: ["checkOtp"],
    onSuccess: (data: ApiResponse<CheckOtpRes>) => {
      localStorage.setItem("accessToken", data.data.tokens.accessToken);
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
    },
  });
};
