export interface StatsRequest {
  dateFrom?: string;
  dateTo?: string;
}

export interface StatsResponse {
  // Add your statistics response structure here
  [key: string]: any;
}