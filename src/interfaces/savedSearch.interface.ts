import type { OneCarMarkClient } from "./home.interface";

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
  id: string;
  userId: string;
  created: string;
  regions: string[];
  characteristics: string[];
  characteristicItems: string[];
  carmark?: OneCarMarkClient;
}

export interface SavedSearchItem {
  count: number;
  savedSearche: SaveSearchRes;
}

export interface SaveSearchList {
  rows: SavedSearchItem[];
  count: number;
}
