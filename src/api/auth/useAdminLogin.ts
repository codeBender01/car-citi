import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  AdminSignInReq,
  AdminSignInResp,
} from "@/interfaces/auth.interface";

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: async (
      payload: AdminSignInReq
    ): Promise<ApiResponse<AdminSignInResp>> => {
      const { data } = await apiClient.post("/auth/admin-sign-in", payload);
      return data;
    },
    mutationKey: ["adminSignIn"],
  });
};
