import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  ChangePasswordReq,
  OneAdmin,
} from "@/interfaces/admins.interface";

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: ChangePasswordReq,
    ): Promise<ApiResponse<OneAdmin>> => {
      const { data } = await apiClient.put(
        "/auth/admins/change-password",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    mutationKey: ["changePassword"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllAdmins"] });
    },
  });
};
