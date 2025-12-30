export interface NewFaq {
  id: string;
  titleTk: string;
  titleRu: string;
  descriptionTk: string;
  descriptionRu: string;
}

export interface FaqsAdmin {
  rows: OneFaqAdmin[];
  count: number;
}

export interface OneFaqAdmin {
  id: string;
  title: string;
  description: string;
  created: string;
  titleTk: string;
  titleRu: string;
  descriptionTk: string;
  descriptionRu: string;
}
