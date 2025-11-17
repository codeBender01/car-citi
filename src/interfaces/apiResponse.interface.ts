export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  statusCode: number;
  timestamp: string;
}
