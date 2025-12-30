export interface NewNewsCategory {
  id: string;
  nameTk: string;
  nameRu: string;
}

export interface NewsCategories {
  rows: OneNewsCategory[];
  count: number;
}

export interface OneNewsCategory {
  name: string;
  id: string;
  nameTk: string;
  nameRu: string;
}

export interface NewNewsTag {
  id: string;
  nameTk: string;
  nameRu: string;
}

export interface NewsTags {
  rows: OneNewsTag[];
  count: number;
}

export interface OneNewsTag {
  name: string;
  id: string;
  nameTk: string;
  nameRu: string;
}
