import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  NewCarDriveType,
  OneCarDriveType,
} from "@/interfaces/carSpecs.interface";

export const useAddCarSpecsDriveType = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewCarDriveType
    ): Promise<ApiResponse<OneCarDriveType>> => {
      const { data } = await apiClient.post(
        "/car-specs/admin-drive-type-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addCarSpecsDriveType"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllDriveTypes"] });
    },
  });
};