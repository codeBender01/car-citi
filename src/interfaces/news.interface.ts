import type { Image } from "./file.interface";

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

export interface NewNews {
  id: string;
  image: Image;
  titleTk: string;
  titleRu: string;
  descriptionTk: string;
  descriptionRu: string;
  tagIds: string[];
  categoryIds: string[];
}
