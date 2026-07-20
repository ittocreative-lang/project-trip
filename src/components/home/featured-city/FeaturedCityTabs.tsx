"use client";

import { useMemo, useState } from "react";

import FeaturedHotelList from "./FeaturedHotelList";
import type { FeaturedCity } from "./types";

interface Props {
  cities: FeaturedCity[];
  locale: string;
}

export default function FeaturedCityTabs({
  cities,
  locale,
}: Props) {
  const [activeCityId, setActiveCityId] = useState(
    cities[0]?.city.id
  );

  const activeCity = useMemo(() => {
    return cities.find(
      (item) => item.city.id === activeCityId
    );
  }, [cities, activeCityId]);

  if (!cities.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">
        <p className="text-slate-500">
          No featured cities available.
        </p>
      </div>
    );
  }

  return (
    <section>

      {/* Tabs */}
      <div
        className="
          flex
          gap-3
          overflow-x-auto
          pb-2
          scrollbar-hide
        "
      >
        {cities.map((item) => {
          const active =
            item.city.id === activeCityId;

          return (
            <button
              key={item.id}
              onClick={() =>
                setActiveCityId(item.city.id)
              }
              className={`
                whitespace-nowrap
                rounded-full
                border
                px-5
                py-2.5
                text-sm
                font-medium
                transition

                ${
                  active
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white hover:border-blue-600 hover:text-blue-600"
                }
              `}
            >
              {item.city.name}
            </button>
          );
        })}
      </div>

      {/* Hotels */}
      <FeaturedHotelList
        locale={locale}
        hotels={activeCity?.city.hotels ?? []}
      />

    </section>
  );
}