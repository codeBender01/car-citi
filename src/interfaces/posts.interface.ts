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
