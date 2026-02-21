export interface DiagnosticsReq {
  carMarkId: string;
  carModelId: string;
  issueYear: string;
  vin: string;
  mileage: number;
  phone: string;
  name: string;
  regionId: string;
  cityId: string;
  comment: string;
}

export interface DiagnosticsItem {
  id: string;
  carMarkId: string;
  carModelId: string;
  issueYear: string;
  vin: string;
  phone: string;
  name: string;
  comment: string;
  isRead: boolean;
  regionId: string;
  cityId: string;
  carmark: {
    id: string;
    name: string;
    carModels: [];
    logo: { url: string; hashblur: string };
  };
  carmodel: {
    id: string;
    name: string;
    carmodelEquipments: [];
  };
  city: { id: string; name: string; regionId: string };
  region: { id: string; name: string; cities: [] };
}

export interface DiagnosticsList {
  rows: DiagnosticsItem[];
  count: number;
}

export interface DiagnosticsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  carMarkId?: string;
  carModelId?: string;
  regionId?: string;
  cityId?: string;
}
