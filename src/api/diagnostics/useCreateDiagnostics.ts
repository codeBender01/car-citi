import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { DiagnosticsReq } from "@/interfaces/diagnostics.interface";

export const useCreateDiagnostics = () => {
  const token = localStorage.getItem("accessToken");
  return useMutation({
    mutationFn: async (
      payload: DiagnosticsReq,
    ): Promise<ApiResponse<unknown>> => {
      const { data } = await apiClient.post("/cars/diagnostics", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["createDiagnostics"],
  });
};
