export interface SaveSearchReq {
  characteristicIds?: string[];
  characteristicItemIds?: string[];
  verifiedStatus?: string | null;
  vin?: string;
  regionId?: string[];
  cityId?: string;
  carMarkId?: string;
  carModelId?: string;
  driveTypeId?: string;
  transmissionId?: string;
  carConditionId?: string;
  subcategoryId?: string;
  yearFrom?: string;
  yearTo?: string;
  priceFrom?: number;
  priceTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
  colorId?: string;
}

export interface SaveSearchRes extends SaveSearchReq {
  userId: string;
}

export interface SaveSearchList {
  rows: SaveSearchRes[];
  count: number;
}
