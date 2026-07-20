"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"

type Props = {
  locale: string
  hotel: {
    id: string
    slug: string
    name: string
    stars: number
    rating: number

    city: {
      name: string
    }

    images: {
      url: string
    }[]

    providers: {
      providerId: string
      affiliateUrl: string
      price: number | null
    }[]

    distanceFromCenter?: number | null
  }
}

export default function HotelCard({
  hotel,
  locale,
}: Props) {
  /* VALID PROVIDERS */
  const validProviders = hotel.providers.filter(
    (p) => p.affiliateUrl
  )

  /* STABLE PROVIDER */
  const provider = validProviders[0]

  /* LOWEST PRICE */
  const lowestPrice = hotel.providers[0]?.price

  /* DETAIL URL (LOCALE FIXED) */
  const detailUrl = `/${locale}/hotels/${hotel.slug}`

  /* REDIRECT URL */
  const redirectUrl = provider
    ? `/redirect/${provider.providerId}?url=${encodeURIComponent(
        provider.affiliateUrl
      )}`
    : detailUrl

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:shadow-lg">

      <div className="grid gap-0 md:grid-cols-[260px_1fr]">

        {/* IMAGE */}
        <Link href={detailUrl} className="block overflow-hidden">
          <img
            src={hotel.images[0]?.url || "/placeholder.jpg"}
            alt={hotel.name}
            className="h-[230px] w-full object-cover transition duration-300 hover:scale-105 md:h-full"
          />
        </Link>

        {/* CONTENT */}
        <div className="flex flex-col justify-between p-6">

          {/* TOP */}
          <div>

            {/* HEADER */}
            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0">

                <Link href={detailUrl}>
                  <h2 className="truncate text-2xl font-bold text-slate-900 transition hover:text-blue-600">
                    {hotel.name}
                  </h2>
                </Link>

                {/* LOCATION */}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">

                  <MapPin className="h-4 w-4 shrink-0" />

                  <span>{hotel.city.name}</span>

                  {hotel.distanceFromCenter && (
                    <>
                      <span>•</span>
                      <span>
                        {hotel.distanceFromCenter} km from center
                      </span>
                    </>
                  )}
                </div>

                {/* STARS */}
                <div className="mt-4 flex items-center gap-1 text-sm">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>

              </div>

              {/* RATING */}
              {hotel.rating > 0 && (
                <div className="flex shrink-0 flex-col items-end">

                  <span className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-bold text-white shadow-sm">
                    {hotel.rating}
                  </span>

                  <span className="mt-2 text-xs font-medium text-slate-500">
                    Excellent
                  </span>

                </div>
              )}

            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-8 flex items-end justify-between border-t border-slate-100 pt-5">

            {/* PRICE */}
            <div>

              <p className="text-sm text-slate-500">
                Starting from
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                {lowestPrice
                  ? `Rp ${lowestPrice.toLocaleString("id-ID")}`
                  : "-"}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Includes taxes & fees
              </p>

            </div>

            {/* BUTTON */}
            <Link
              href={redirectUrl}
              className="rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Deal
            </Link>

          </div>

        </div>
      </div>
    </div>
  )
}