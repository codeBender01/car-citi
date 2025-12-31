import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { Image } from "@/interfaces/file.interface";

export const useUploadSingle = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (payload: FormData): Promise<ApiResponse<Image>> => {
      const { data } = await apiClient.post("/upload/single", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    mutationKey: ["uploadSingle"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploads"] });
    },
  });
};
