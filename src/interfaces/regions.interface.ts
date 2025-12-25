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
}

export interface NewRegion {
  id: string;
  nameTk: string;
  nameRu: string;
}
