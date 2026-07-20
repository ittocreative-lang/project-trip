"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import type { FeaturedHotel } from "./types";

interface Props {
  hotel: FeaturedHotel;
  locale: string;
}

export default function FeaturedHotelCard({
  hotel,
  locale,
}: Props) {
  const image =
    hotel.images?.[0]?.url ??
    "/images/hotel-placeholder.jpg";

  const provider =
    hotel.providers?.[0]?.provider;

  return (
    <Link
      href={`/${locale}/hotel/${hotel.slug}`}
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        transition
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={hotel.name}
          fill
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 shadow">
          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-xs font-semibold">
            {hotel.stars}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">

        <h3
          className="
            line-clamp-2
            text-base
            font-semibold
            text-slate-900
          "
        >
          {hotel.name}
        </h3>

        <div className="flex items-center gap-1 text-sm text-slate-500">
          <MapPin size={15} />

          <span>
            {hotel.slug.replaceAll("-", " ")}
          </span>
        </div>

        <div className="flex items-center justify-between">

          <div>
            {hotel.priceMin ? (
              <>
                <div className="text-xs text-slate-500">
                  From
                </div>

                <div className="text-lg font-bold text-blue-600">
                  ${hotel.priceMin}
                </div>
              </>
            ) : (
              <div className="text-sm text-slate-400">
                Check availability
              </div>
            )}
          </div>

          {provider && (
            <div className="text-right">
              <div className="text-xs text-slate-500">
                Partner
              </div>

              <div className="text-sm font-medium">
                {provider.name}
              </div>
            </div>
          )}

        </div>

      </div>
    </Link>
  );
}