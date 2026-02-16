import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { EditAdminReq, OneAdmin } from "@/interfaces/admins.interface";

export const useEditAdmin = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: EditAdminReq,
    ): Promise<ApiResponse<OneAdmin>> => {
      const { data } = await apiClient.put("/auth/admins", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["editAdmin"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllAdmins"] });
    },
  });
};
