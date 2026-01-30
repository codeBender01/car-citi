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
  status?: "checking" | "confirmed" | "rejected";
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
  status?: "checking" | "confirmed" | "rejected";
}

export interface NewPostReq {
  tags?: string[];
  engineVolume: number;
  doors: number;
  regionId: string;
  saleTypeId: string;
  cityId: string;
  carMarkId: string;
  carModelId: string;
  issueYear: string;
  subcategoryId: string;
  carConditionId: string;
  fuelTypeId: string;
  driveTypeId: string;
  transmissionId: string;
  colorId: string;
  mileage: number;
  carEquipment: string;
  damage: string;
  categoryId: string;
  phone: string;
  title: string;
  cylinders: string;
  vin: string;
  carPrice: {
    price: number;
    prefixPrice: string;
    suffixPrice: string;
    customPrice: string;
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
