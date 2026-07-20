"use client"

import { useState } from "react"

import Map, {
  Marker,
  NavigationControl,
} from "react-map-gl/mapbox"

import "mapbox-gl/dist/mapbox-gl.css"

import {
  Expand,
  MapPin,
  X,
} from "lucide-react"

type Props = {
  hotels: {
    id: string
    name: string
    slug: string
    latitude: number | null
    longitude: number | null
  }[]
}

export default function HotelsSearchMap({
  hotels,
}: Props) {
  const [open, setOpen] = useState(false)

  const token =
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!token) {
    return null
  }

  const validHotels = hotels.filter(
    (hotel) =>
      hotel.latitude &&
      hotel.longitude
  )

  if (validHotels.length === 0) {
    return null
  }

  const centerHotel = validHotels[0]

  const mapContent = (
    <Map
      mapboxAccessToken={token}
      initialViewState={{
        latitude:
          centerHotel.latitude || -6.2,

        longitude:
          centerHotel.longitude || 106.8,

        zoom: 12,
      }}
      mapStyle="mapbox://styles/mapbox/standard"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <NavigationControl position="top-right" />

      {validHotels.map((hotel) => (
        <Marker
          key={hotel.id}
          latitude={hotel.latitude!}
          longitude={hotel.longitude!}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl ring-4 ring-white">
            <MapPin className="h-5 w-5" />
          </div>
        </Marker>
      ))}
    </Map>
  )

  return (
    <>
{/* SIDEBAR MAP */}
<aside className="block w-full">

  <div className="sticky top-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

    {/* HEADER */}
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

      <div>
        <h2 className="font-bold text-slate-900">
          Hotel Map
        </h2>

        <p className="text-sm text-slate-500">
          {validHotels.length} hotels
        </p>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-50"
      >
        <Expand className="h-5 w-5" />
      </button>

    </div>

    {/* MAP */}
    <div className="relative h-[320px] xl:h-[calc(100vh-120px)] w-full">

      {mapContent}

      <button
        onClick={() => setOpen(true)}
        className="absolute inset-0 z-10"
      />

    </div>
  </div>
</aside>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="relative h-[85vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl"
            >
              <X className="h-6 w-6" />
            </button>

            {/* MAP */}
            <div className="h-full w-full">

              <Map
                mapboxAccessToken={token}
                initialViewState={{
                  latitude:
                    centerHotel.latitude ||
                    -6.2,

                  longitude:
                    centerHotel.longitude ||
                    106.8,

                  zoom: 12,
                }}
                mapStyle="mapbox://styles/mapbox/standard"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <NavigationControl position="top-right" />

                {validHotels.map((hotel) => (
                  <Marker
                    key={hotel.id}
                    latitude={hotel.latitude!}
                    longitude={hotel.longitude!}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl ring-4 ring-white">
                      <MapPin className="h-5 w-5" />
                    </div>
                  </Marker>
                ))}

              </Map>

            </div>
          </div>
        </div>
      )}
    </>
  )
}