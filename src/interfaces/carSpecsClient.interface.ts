export interface CarConditionsClient {
  count: number;
  rows: OneCarConditionClient[];
}

export interface OneCarConditionClient {
  description: string;
  id: string;
  name: string;
}

export interface DriveTypeClient {
  count: number;
  rows: OneDriveTypeClient[];
}

export interface OneDriveTypeClient {
  id: string;
  name: string;
}

export interface CarCharsClient {
  count: number;
  rows: OneCarCharClient[];
}

export interface OneCarCharClient {
  id: string;
  name: string;
  items: {
    id: string;
    name: string;
    characteristicId: string;
  }[];
}
