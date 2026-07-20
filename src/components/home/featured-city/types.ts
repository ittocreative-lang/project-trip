export interface FeaturedHotel {
  id: number;

  name: string;

  slug: string;

  stars: number;

  priceMin: number | null;

  images: {
    url: string;
  }[];

  providers: {
    id: number;
    provider: {
      name: string;
      logo: string | null;
    };
  }[];
}

export interface FeaturedCity {
  id: number;

  sortOrder: number;

  city: {
    id: number;

    name: string;

    slug: string;

    hotels: FeaturedHotel[];
  };
}