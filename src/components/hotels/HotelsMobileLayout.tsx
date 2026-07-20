"use client"

import { useState } from "react"

import HotelCard from "@/components/hotels/HotelCard"
import HotelFilters from "@/components/hotels/HotelFilters"
import HotelsSearchMap from "@/components/hotels/HotelSearchMap"
import HotelsSort from "@/components/hotels/HotelSort"

type Props = {
  hotels: any[]
  cities: {
    id: number
    name: string
  }[]
  sort: string
  q: string
}

export default function HotelsMobileLayout({
  hotels,
  cities,
  sort,
  q,
}: Props) {
  const [showMap, setShowMap] =
    useState(false)

  return (
    <>
{/* MOBILE ACTIONS */}
<div className="mb-5 flex justify-end xl:hidden">

  {/* SHOW MAP */}
  <button
    onClick={() =>
      setShowMap(true)
    }
    className="flex h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
  >
    Show Map
  </button>

</div>

      {/* MAP MODAL MOBILE */}
      {showMap && (
        <div className="fixed inset-0 z-[9999] bg-white">

          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Hotel Map
              </h2>

              <p className="text-sm text-slate-500">
                {hotels.length} hotels
              </p>
            </div>

            <button
              onClick={() =>
                setShowMap(false)
              }
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
            >
              Close
            </button>

          </div>

          {/* MAP */}
          <div className="h-[calc(100vh-73px)]">
            <HotelsSearchMap
              hotels={hotels}
            />
          </div>

        </div>
      )}

      {/* TOP BAR */}
      <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:flex-row md:items-center md:justify-between">

        {/* RESULT */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Search Results
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {hotels.length} hotels found
            {q
              ? ` for "${q}"`
              : ""}
          </p>
        </div>

        {/* SORT */}
        <HotelsSort
          currentSort={sort}
        />

      </div>

      {/* MOBILE FILTER */}
      <div className="mb-5 xl:hidden">
        <HotelFilters
          cities={cities}
        />
      </div>

      {/* EMPTY */}
      {hotels.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

          <h2 className="text-xl font-semibold text-slate-900">
            No hotels found
          </h2>

          <p className="mt-2 text-slate-500">
            Try another destination
          </p>

        </div>
      )}

      {/* LIST */}
      <div className="space-y-5">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            locale="id"
          />
        ))}
      </div>
    </>
  )
}