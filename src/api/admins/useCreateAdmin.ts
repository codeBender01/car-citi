import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewAdmin, OneAdmin } from "@/interfaces/admins.interface";

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (payload: NewAdmin): Promise<ApiResponse<OneAdmin>> => {
      const { data } = await apiClient.post("/auth/admins", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["createAdmin"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllAdmins"] });
    },
  });
};
