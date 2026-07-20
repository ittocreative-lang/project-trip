"use client";

import type { FeaturedHotel } from "./types";
import FeaturedHotelCard from "./FeaturedHotelCard";

interface Props {
  hotels: FeaturedHotel[];
  locale: string;
}

export default function FeaturedHotelList({
  hotels,
  locale,
}: Props) {
  if (!hotels.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">
        <p className="text-slate-500">
          No hotels available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        mt-8
        grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {hotels.map((hotel) => (
        <FeaturedHotelCard
          key={hotel.id}
          hotel={hotel}
          locale={locale}
        />
      ))}
    </div>
  );
}