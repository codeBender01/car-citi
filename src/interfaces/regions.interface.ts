export interface RegionsAllRes {
  count: number;
  rows: OneRegion[];
}

export interface OneRegion {
  cities: {
    id: string;
    name: string;
    regionId: string;
  }[];
  id: string;
  name: string;
  nameTk: string;
  nameRu: string;
}

export interface NewRegion {
  id: string;
  nameTk: string;
  nameRu: string;
}

export interface City {
  id: string;
  nameTk: string;
  nameRu: string;
  regionId: string;
}

export interface NewCity {
  id?: string;
  nameTk: string;
  nameRu: string;
  regionId: string;
}
