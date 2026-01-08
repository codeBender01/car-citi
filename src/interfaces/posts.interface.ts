export interface PostsFilters {
  regionId?: string;
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
  carPrice: {
    customPrice: string;
    prefixPrice: string;
    price: number;
    suffixPrice: string;
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
  mileage: string;
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
  carMap: {
    address: string;
    location: string;
    mapUrl: string;
    latitude: string;
    longitude: string;
  };
  carCharacteristics: {
    characteristicId: string;
    characteristicItemId: string;
    checked: boolean;
  };
}
