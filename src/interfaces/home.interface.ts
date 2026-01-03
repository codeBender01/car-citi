import type { Image } from "./file.interface";

export interface HomeData {
  banners: {
    id: string;
    image: {
      hashblur: string;
      url: string;
    };
    link: string;
  }[];
  carCategories: {
    count: number;
    mark: {
      id: string;
      name: string;
      subcategories: {
        id: string;
        name: string;
        categoryId: string;
      }[];
    };
  }[];
  carFavorites: HomeCarModel[];
  carMarks: {
    count: number;
    mark: OneCarMarkClient;
  }[];
  carPopular: HomeCarModel[];
  carRecent: HomeCarModel[];
  counts: {
    dealerCount: number;
    postCount: number;
    successfulTransactionCount: number;
    userCount: number;
  };
}

export interface OneCarMarkClient {
  id: string;
  name: string;
  logo: {
    hashblur: string;
    url: string;
  };
  carModels: OneCarModelClient[];
}

export interface OneCarModelClient {
  id: string;
  name: string;
}

export interface HomeCarModel {
  carMark: OneCarMarkClient;
  carModel: OneCarModelClient;
  carPrice: {
    customPrice: string;
    prefixPrice: string;
    price: string;
    suffixPrice: string;
  };
  fuelType: {
    id: string;
    name: string;
  };
  id: string;
  images: {
    images: Image[];
    reports: {
      url: string;
      name: string;
    }[];
  }[];
  isfavorite: boolean;
  issueYear: string;
  transmission: {
    id: string;
    name: string;
  };
  viewed: boolean;
}
