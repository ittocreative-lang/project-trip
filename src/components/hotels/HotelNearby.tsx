import {
  MapPin,
  Plane,
  ShoppingBag,
  Utensils,
  Building2,
} from "lucide-react"

type Props = {
  attractions: {
    attraction: {
      id: string
      name: string
      type?: string | null
    }
    distanceKm?: number | null
  }[]
}

const typeIconMap: Record<
  string,
  React.ElementType
> = {
  AIRPORT: Plane,
  SHOPPING: ShoppingBag,
  RESTAURANT: Utensils,
  LANDMARK: Building2,
}

export default function HotelNearby({
  attractions,
}: Props) {
  if (!attractions?.length) return null

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">

      {/* HEADER */}
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-600" />

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Nearby Attractions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Places near this hotel
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {attractions.map((item) => {
          const Icon =
            typeIconMap[
              item.attraction.type || ""
            ] || MapPin

          return (
            <div
              key={item.attraction.id}
              className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-blue-300 hover:bg-slate-50"
            >
              {/* ICON */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon className="h-4 w-4" />
              </div>

              {/* CONTENT */}
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-medium text-slate-800">
                  {item.attraction.name}
                </p>

                {item.attraction.type && (
                  <p className="mt-1 text-xs text-slate-500">
                    {item.attraction.type
                      .replaceAll("_", " ")
                      .toLowerCase()}
                  </p>
                )}

                {item.distanceKm && (
                  <p className="mt-2 text-xs font-medium text-blue-600">
                    {item.distanceKm} km away
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}