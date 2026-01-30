export interface BannersList {
  count: number;
  rows: OneBanner[];
}

export interface OneBanner {
  id: string;
  link: string;
  image: {
    url: string;
    hashblur: string;
  };
}

export interface NewBanner {
  id: string;
  link: string;
  image: {
    url: string;
    hashblur: string;
  };
}
