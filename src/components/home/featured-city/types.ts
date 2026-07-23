export interface FeaturedHotel {
  id: string;

  name: string;

  slug: string;

  stars: number;

  priceMin: number | null;

  images: {
    id: string;
    url: string;
  }[];

  providers: {
    id: string;

    provider: {
      id: string;
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