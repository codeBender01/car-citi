export interface NewCarSpecsCategory {
  id: string;
  nameTk: string;
  nameRu: string;
}

export interface OneCarSpecsCategory {
  id: string;
  nameTk: string;
  nameRu: string;
  name: string;
  subcategories: OneCarSpecsSubcategory[];
}

export interface OneCarSpecsSubcategory {
  categoryId: string;
  id: string;
  nameTk: string;
  nameRu: string;
  name: string;
}

export interface CarSpecsCategoriesList {
  count: number;
  rows: OneCarSpecsCategory[];
}

export interface NewCarSpecsSubcategory {
  id: string;
  nameTk: string;
  nameRu: string;
  categoryId: string;
}

export interface NewCarCondition {
  id: string;
  nameTk: string;
  nameRu: string;
  descriptionTk: string;
  descriptionRu: string;
}

export interface OneCarCondition {
  id: string;
  nameTk: string;
  nameRu: string;
  descriptionTk: string;
  descriptionRu: string;
  name: string;
  description: string;
}

export interface CarSpecsConditionsList {
  count: number;
  rows: OneCarCondition[];
}

export interface NewCarDriveType {
  id: string;
  nameTk: string;
  nameRu: string;
}

export interface OneCarDriveType {
  id: string;
  nameTk: string;
  nameRu: string;
  name: string;
}

export interface CarSpecsDriveTypesList {
  count: number;
  rows: OneCarDriveType[];
}

export interface NewCarFuelType {
  id: string;
  nameTk: string;
  nameRu: string;
}

export interface OneCarFuelType {
  id: string;
  nameTk: string;
  nameRu: string;
  name: string;
}

export interface CarSpecsFuelTypesList {
  count: number;
  rows: OneCarFuelType[];
}

export interface NewCarTransmission {
  id: string;
  nameTk: string;
  nameRu: string;
}

export interface OneCarTransmission {
  id: string;
  nameTk: string;
  nameRu: string;
  name: string;
}

export interface CarSpecsTransmissionsList {
  count: number;
  rows: OneCarTransmission[];
}
