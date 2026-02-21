export interface CarFaxReportReq {
  isPaid: boolean;
  vin: string;
  images: string[];
  reports: string[];
  price: number;
  postId: string;
}

export interface CarFaxReportRes {
  vin: string;
  carId: string;
  images: string[];
  reports: string[];
  price: number;
}

export interface CarFaxItem {
  status: string;
  vin: string;
  carId: string;
  images: string[];
  reports: string[];
  price: number;
}

export interface CarFaxList {
  count: number;
  rows: CarFaxItem[];
}
