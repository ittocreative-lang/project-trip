import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

import HotelAbout from "@/components/hotels/HotelAbout"
import HotelGallery from "@/components/hotels/HotelGallery"
import HotelAmenities from "@/components/hotels/HotelAmenities"
import HotelProviders from "@/components/hotels/HotelProviders"
import HotelNearby from "@/components/hotels/HotelNearby"
import HotelMap from "@/components/hotels/HotelMap"

export default async function HotelDetailPage({
  params
}: {
  params: Promise<{
    locale: string
    slug: string
  }>
}) {
  const { slug } = await params

  const hotel = await prisma.hotel.findUnique({
    where: {
      slug,
    },

    include: {
      images: true,

      city: true,

      amenities: {
        include: {
          amenity: {
            include: {
              category: true,
            },
          },
        },
      },

      attractions: {
        include: {
          attraction: true,
        },

        orderBy: {
          distanceKm: "asc",
        },
      },

      providers: {
        include: {
          provider: true,
        },

        orderBy: {
          price: "asc",
        },
      },
    },
  })

  if (!hotel) {
    notFound()
  }

  const lowestPrice =
    hotel.providers[0]?.price

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6">

        {/* HEADER */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {hotel.name}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {hotel.city.name}
            </p>
          </div>

          {lowestPrice && (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Starting from
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                Rp{" "}
                {lowestPrice.toLocaleString()}
              </p>
            </div>
          )}
        </div>

{/* GALLERY */}
<div className="mt-8">
  <HotelGallery
    images={hotel.images}
    hotelName={hotel.name}
  />
</div>

{/* PROVIDERS BELOW GALLERY */}
<div className="mt-6">
  <HotelProviders
    providers={hotel.providers}
  />
</div>

{/* CONTENT */}
<div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">

  {/* LEFT */}
  <div className="space-y-8">

    {/* ABOUT */}
    <HotelAbout
      description={
        hotel.shortDescription
      }
      phone={hotel.phone}
      officialSite={
        hotel.officialSite
      }
      address={hotel.address}
    />

    {/* AMENITIES */}
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <HotelAmenities
        amenities={
          hotel.amenities
        }
      />
    </section>

    {/* NEARBY */}
    <HotelNearby
      attractions={
        hotel.attractions
      }
    />

<HotelMap
  latitude={hotel.latitude}
  longitude={hotel.longitude}
  name={hotel.name}
  city={hotel.city.name}
/>

  </div>



  {/* SIDEBAR */}
  <aside className="space-y-6">

    {/* QUICK INFO */}
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-slate-900">
        Hotel Info
      </h3>

      <div className="mt-4 space-y-4 text-sm">

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            City
          </span>

          <span className="font-medium text-slate-800">
            {hotel.city.name}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            Amenities
          </span>

          <span className="font-medium text-slate-800">
            {
              hotel.amenities.length
            }
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            Nearby Places
          </span>

          <span className="font-medium text-slate-800">
            {
              hotel.attractions
                .length
            }
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            Providers
          </span>

          <span className="font-medium text-slate-800">
            {
              hotel.providers
                .length
            }
          </span>
        </div>

      </div>
    </div>

  </aside>
</div>
      </div>
    </div>
  )
}
