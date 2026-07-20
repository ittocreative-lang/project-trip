import { prisma } from "@/lib/prisma"

import HotelFilters from "@/components/hotels/HotelFilters"
import HotelsSearchMap from "@/components/hotels/HotelSearchMap"
import HotelsMobileLayout from "@/components/hotels/HotelsMobileLayout"

import HeroSearch from "@/components/home/HeroSearch"

type Props = {
  searchParams: Promise<{
    q?: string
    city?: string
    minPrice?: string
    maxPrice?: string
    sort?: string

    checkIn?: string
    checkOut?: string

    adults?: string
    children?: string
    rooms?: string
  }>
}

export default async function HotelsPage({
  searchParams,
}: Props) {
  const params = await searchParams

  const q = params.q || ""

  const city = params.city || ""

  const minPrice =
    params.minPrice || ""

  const maxPrice =
    params.maxPrice || ""

  const sort = params.sort || ""

  /* ====================================== */
  /* CITIES */
  /* ====================================== */
  const cities =
    await prisma.city.findMany({
      orderBy: {
        name: "asc",
      },
    })

  /* ====================================== */
  /* HOTELS */
  /* ====================================== */
  const hotels =
    await prisma.hotel.findMany({
      where: {
        status: "PUBLISHED",

        AND: [
          q
            ? {
                OR: [
                  {
                    name: {
                      contains: q,
                      mode:
                        "insensitive",
                    },
                  },

                  {
                    city: {
                      name: {
                        contains: q,
                        mode:
                          "insensitive",
                      },
                    },
                  },
                ],
              }
            : {},

          city
            ? {
                city: {
                  name: city,
                },
              }
            : {},

          minPrice
            ? {
                priceMin: {
                  gte: Number(
                    minPrice
                  ),
                },
              }
            : {},

          maxPrice
            ? {
                priceMin: {
                  lte: Number(
                    maxPrice
                  ),
                },
              }
            : {},
        ],
      },

      orderBy:
        sort === "price_asc"
          ? {
              priceMin: "asc",
            }
          : sort ===
            "price_desc"
          ? {
              priceMin: "desc",
            }
          : sort ===
            "rating_desc"
          ? {
              rating: "desc",
            }
          : {
              createdAt: "desc",
            },

      include: {
        city: true,

        images: true,

        providers: {
          include: {
            provider: true,
          },

          orderBy: {
            price: "asc",
          },
        },
      },

      take: 20,
    })

  return (
    <div className="min-h-screen bg-slate-50">

      {/* SEARCH BAR */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl">
          <HeroSearch />
        </div>
      </div>

      {/* PAGE */}
      <div className="mx-auto w-[96%] max-w-[2200px] py-8">

        {/* LAYOUT */}
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_620px]">

          {/* FILTER DESKTOP */}
          <aside className="hidden xl:block">

            <div className="sticky top-24">
              <HotelFilters
                cities={cities}
              />
            </div>

          </aside>

          {/* HOTEL LIST */}
          <div className="min-w-0">

            <HotelsMobileLayout
              hotels={hotels}
              cities={cities}
              sort={sort}
              q={q}
            />

          </div>

          {/* MAP DESKTOP */}
          <div className="hidden xl:block min-w-0">

            <div className="sticky top-24">

              <HotelsSearchMap
                hotels={hotels}
              />

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}