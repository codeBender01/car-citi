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
