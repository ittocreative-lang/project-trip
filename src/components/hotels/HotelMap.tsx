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
  latitude?: number | null
  longitude?: number | null
  name: string
  city?: string
}

export default function HotelMap({
  latitude,
  longitude,
  name,
  city,
}: Props) {
  const [open, setOpen] = useState(false)

  if (!latitude || !longitude) {
    return null
  }

  const token =
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!token) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        Missing Mapbox token
      </div>
    )
  }

  const mapContent = (
    <Map
      mapboxAccessToken={token}
      initialViewState={{
        latitude,
        longitude,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/standard"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* CONTROLS */}
      <NavigationControl position="top-right" />

      {/* MARKER */}
      <Marker
        latitude={latitude}
        longitude={longitude}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl ring-4 ring-white">
          <MapPin className="h-5 w-5" />
        </div>
      </Marker>
    </Map>
  )

  return (
    <>
      {/* NORMAL MAP */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Location
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Explore nearby area
            </p>
          </div>

          <div className="flex items-center gap-3">
            {city && (
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                {city}
              </div>
            )}

            {/* EXPAND BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
            >
              <Expand className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* MAP */}
        <div className="relative h-[320px] md:h-[450px]">
          {mapContent}

          {/* OVERLAY CLICK */}
          <button
            onClick={() => setOpen(true)}
            className="absolute inset-0 z-10"
          />

          {/* FLOATING CARD */}
          <div className="pointer-events-none absolute bottom-4 left-4 z-20 w-[280px] rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Hotel Location
            </p>

            <h3 className="mt-1 text-lg font-bold text-slate-900">
              {name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Prime area in {city}
            </p>
          </div>
        </div>
      </section>

{/* MODAL */}
{open && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

    {/* MODAL CARD */}
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
            latitude,
            longitude,
            zoom: 15,
          }}
          mapStyle="mapbox://styles/mapbox/standard"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <NavigationControl position="top-right" />

          <Marker
            latitude={latitude}
            longitude={longitude}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl ring-4 ring-white">
              <MapPin className="h-6 w-6" />
            </div>
          </Marker>
        </Map>
      </div>

      {/* INFO */}
      <div className="absolute bottom-6 left-6 z-50 w-[320px] rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur">

        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Hotel Location
        </p>

        <h3 className="mt-1 text-xl font-bold text-slate-900">
          {name}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          {city}
        </p>

      </div>
    </div>
  </div>
)}
    </>
  )
}