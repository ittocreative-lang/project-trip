"use client"

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet"

import L from "leaflet"

import "leaflet/dist/leaflet.css"

import { MapPin } from "lucide-react"

type Props = {
  latitude?: number | null
  longitude?: number | null
  name: string
  city?: string
}

/* CUSTOM ICON */
const hotelIcon = new L.DivIcon({
  html: `
    <div style="
      width:40px;
      height:40px;
      border-radius:9999px;
      background:#2563eb;
      display:flex;
      align-items:center;
      justify-content:center;
      box-shadow:0 8px 20px rgba(0,0,0,.2);
      border:3px solid white;
      color:white;
      font-size:18px;
    ">
      📍
    </div>
  `,
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

export default function HotelMap({
  latitude,
  longitude,
  name,
  city,
}: Props) {
  if (!latitude || !longitude) {
    return null
  }

  return (
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

        {city && (
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            {city}
          </div>
        )}
      </div>

      {/* MAP */}
      <div className="relative h-[320px] md:h-[450px]">
        <MapContainer
          center={[latitude, longitude]}
          zoom={14}
          scrollWheelZoom={true}
          zoomControl={false}
          className="h-full w-full"
        >
          {/* HUMANITARIAN STYLE */}
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          {/* CONTROLS */}
          <ZoomControl position="topright" />

          {/* MARKER */}
          <Marker
            position={[latitude, longitude]}
            icon={hotelIcon}
          >
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">
                  {name}
                </p>

                {city && (
                  <p className="text-sm text-slate-500">
                    {city}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* FLOATING CARD */}
        <div className="absolute bottom-4 left-4 z-[1000] w-[280px] rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur">
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
  )
}