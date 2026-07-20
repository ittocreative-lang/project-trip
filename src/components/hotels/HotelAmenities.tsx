"use client"

import { useState } from "react"
import * as Icons from "lucide-react"

type Props = {
  amenities: {
    amenity: {
      id: string
      name: string
      icon: string | null
      category: {
        name: string
      }
    }
  }[]
}

const iconMap: Record<string, React.ElementType> = {
  Wifi: Icons.Wifi,
  Waves: Icons.Waves,
  Car: Icons.Car,
  Coffee: Icons.Coffee,
  Dumbbell: Icons.Dumbbell,
  Tv: Icons.Tv,
  Bath: Icons.Bath,
  Plane: Icons.Plane,
  UtensilsCrossed: Icons.UtensilsCrossed,
  Sparkles: Icons.Sparkles,
  Check: Icons.Check,
}

export default function HotelAmenities({ amenities }: Props) {
  const [showAll, setShowAll] = useState(false)

  const grouped = amenities.reduce((acc, item) => {
    const category = item.amenity.category.name

    if (!acc[category]) acc[category] = []
    acc[category].push(item)

    return acc
  }, {} as Record<string, typeof amenities>)

  const highlights = grouped["Highlights"] || []

  const otherCategories = Object.entries(grouped).filter(
    ([key]) => key !== "Highlights"
  )

  return (
    <section className="space-y-6">

      {/* TITLE */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Amenities
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Hotel facilities and room features
        </p>
      </div>

      {/* ========================= */}
      {/* HIGHLIGHTS (ALWAYS VISIBLE) */}
      {/* ========================= */}
      {highlights.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">
            Highlights
          </h3>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {highlights.map((item) => {
              const rawIcon = item.amenity.icon ?? ""
              const iconKey =
                rawIcon.charAt(0).toUpperCase() + rawIcon.slice(1)

              const Icon =
                iconMap[iconKey] || Icons.Sparkles

              return (
                <div
                  key={item.amenity.id}
                  className="flex items-center gap-2 text-slate-700"
                >
                  <Icon className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-slate-600">
                    {item.amenity.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* TOGGLE BUTTON */}
      {/* ========================= */}
      {otherCategories.length > 0 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          {showAll ? "Hide all amenities" : "Show all amenities"}
        </button>
      )}

      {/* ========================= */}
      {/* OTHER CATEGORIES */}
      {/* ========================= */}
      {showAll && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">

          {otherCategories.map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-3 text-base font-semibold text-slate-800">
                {category}
              </h3>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {items.map((item) => (
                  <div
                    key={item.amenity.id}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <Icons.Check className="h-4 w-4 text-green-600" />
                    <span>{item.amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      )}
    </section>
  )
}