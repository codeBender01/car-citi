export interface PostsFilters {
  search?: string;
  vin?: string;
  regionId?: string;
  cityId?: string;
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
    customPrice: string;
    prefixPrice: string;
    price: number;
    suffixPrice: string;
  };
  carMap: {
    address: string;
    latitude: string;
    location: string;
    longitude: string;
    mapUrl: string;
  };
  fuelType: {
    id: string;
    name: string;
  };
  id: string;
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
  characteristics?: {
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
  saleTypeId: string;
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
