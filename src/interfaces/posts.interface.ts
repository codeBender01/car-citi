export interface PostsFilters {
  search?: string;
  vin?: string;
  regionId?: string | string[];
  cityId?: string | string[];
  carMarkId?: string;
  carModelId?: string;
  fuelTypeId?: string;
  driveTypeId?: string;
  transmissionId?: string;
  carConditionId?: string;
  categoryId?: string;
  subcategoryId?: string;
  page?: number;
  pageSize?: number;
  yearFrom?: string;
  yearTo?: string;
  priceFrom?: number;
  priceTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
  colorId?: string;
  characteristicIds?: string[];
  characteristicItemIds?: string[];
  offerTypeId?: string;
  dealerId?: string;
  "Accept-Language"?: string;
}

export interface AdminCarsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: "checking" | "confirmed" | "rejected" | "verified";
  language?: string;
}

export interface PostsList {
  count: number;
  rows: OnePost[];
}

export interface OnePost {
  carMark: {
    carModels: [];
    id: string;
    name: string;
  };
  carModel: {
    id: string;
    name: string;
  };
  damage: string;
  carPrice: {
    price: number;
  };
  id: string;
  title: string;
  images: {
    images: {
      hashblur: string;
      url: string;
    }[];
    reports: {
      name: string;
      url: string;
    }[];
  };
  issueYear: string;
  transmission: {
    id: string;
    name: string;
  };
  viewed: false;
  status?: "checking" | "confirmed" | "rejected" | "verified";
  enabled?: boolean;
  isFavorite?: boolean;
  verifiedStatus: string;
  isActive: boolean;
  mileage: number;
  phone: string;
  fuelType?: {
    id: string;
    name: string;
  };
  subcategory?: {
    id: string;
    name: string;
  };
  engineVolume?: number;
  vin?: string;
  color?: {
    id: string;
    name: string;
    hex: string;
  };
  driveType?: {
    id: string;
    name: string;
  };
  carCondition?: {
    id: string;
    name: string;
  };
  region?: {
    id: string;
    name: string;
  };
  city?: {
    id: string;
    name: string;
  };
  carEquipment?: {
    id: string;
    name: string;
  };
  offerType?: {
    id: string;
    name: string;
  };
  carCharacteristics?: {
    id: string;
    name: string;
    items: {
      id: string;
      name: string;
    }[];
  }[];
}

export interface NewPostReq {
  tags?: string[];
  engineVolume: number;
  regionId: string;
  offerTypeId: string;
  cityId: string;
  carMarkId: string;
  carModelId: string;
  issueYear: string;
  subcategoryId: string;
  carConditionId: string;
  driveTypeId: string;
  transmissionId: string;
  colorId: string;
  mileage: number;
  carEquipmentId: string;
  damage: string;
  phone: string;
  title: string;
  vin: string;
  carPrice: {
    price: number;
  };
  carImages: {
    images: {
      url: string;
      hashblur: string;
    }[];
    reports: {
      url: string;
      name: string;
    }[];
    videoUrl: string;
  };
  carCharacteristics: {
    characteristicId: string;
    characteristicItemId: string;
    checked: boolean;
  }[];
}

export interface CheckCarOtpReq {
  phone: string;
  otp: string;
}

export interface VerifyCar {
  carId: string;
  verifiedStatus: "verified" | "notVerified";
}
