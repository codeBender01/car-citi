export interface NewCarMark {
  id: string;
  nameTk: string;
  nameRu: string;
  logo: {
    url: string;
    hashblur: string;
  };
}

export interface OneCarMark {
  id: string;
  nameTk: string;
  nameRu: string;
  name: string;
  logo: {
    url: string;
    hashblur: string;
  };
  carModels: OneCarModel[];
}

export interface CarMarksList {
  count: number;
  rows: OneCarMark[];
}

export interface NewCarModel {
  id: string;
  nameTk: string;
  nameRu: string;
  carMarkId: string;
}

export interface OneCarModel {
  name: string;
  nameTk: string;
  nameRu: string;
  id: string;
}

export interface CarModelsClientRes {
  count: number;
  rows: {
    name: string;
    id: string;
  }[];
}
