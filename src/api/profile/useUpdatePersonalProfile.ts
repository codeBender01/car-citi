import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  ProfileRes,
  UpdatePersonalProfileReq,
} from "@/interfaces/profile.interface";

export const useUpdatePersonalProfile = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  return useMutation({
    mutationFn: async (
      payload: UpdatePersonalProfileReq
    ): Promise<ApiResponse<ProfileRes>> => {
      const { data } = await apiClient.put("/auth/personal-profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["updatePersonalProfile"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
    },
  });
};
