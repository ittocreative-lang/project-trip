import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function HotelPage({ params }: Props) {
  const { id } = await params

  const hotel = await prisma.hotel.findUnique({
    where: { id },
    include: {
      city: {
        include: {
          state: {
            include: {
              country: true,
            },
          },
        },
      },
      amenities: {
        include: {
          amenity: true,
        },
      },
      images: true,
      providers: {
        include: {
          provider: true,
        },
      },
      attractions: {
        include: {
          attraction: true,
        },
      },
    },
  })

  if (!hotel) {
    notFound()
  }

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">{hotel.name}</h1>
          <p className="text-sm text-slate-500 mt-1">
            {hotel.city.name}, {hotel.city.state.name}
          </p>
        </div>
        <Link
          href={`/admin/hotels/${hotel.id}/edit`}
          className="bg-blue-600 px-4 py-2 rounded-lg text-white text-sm font-medium hover:bg-blue-700"
        >
          Edit
        </Link>
      </div>

      {/* STATS - 4 columns */}
      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Rating</p>
          <p className="text-xl font-bold">{hotel.rating}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Stars</p>
          <p className="text-xl font-bold">★{hotel.stars}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Amenities</p>
          <p className="text-xl font-bold">{hotel.amenities.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Images</p>
          <p className="text-xl font-bold">{hotel.images.length}</p>
        </div>
      </div>

      {/* BASIC + CONTACT - 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="font-semibold text-slate-800 mb-2">Basic Info</h2>
          <div className="space-y-1 text-sm">
            <p className="text-slate-500">
              Status: <span className="text-slate-800">{hotel.status || "-"}</span>
            </p>
            <p className="text-slate-500">
              Featured: <span className="text-slate-800">{hotel.isFeatured ? "Yes" : "No"}</span>
            </p>
            <p className="text-slate-500">
              Price:{" "}
              <span className="text-slate-800">
                {hotel.priceMin
                  ? `Rp ${hotel.priceMin.toLocaleString("id-ID")}`
                  : "-"}
              </span>
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="font-semibold text-slate-800 mb-2">Contact</h2>
          <div className="space-y-1 text-sm">
            <p>{hotel.address || "-"}</p>
            <p>{hotel.phone || "-"}</p>
            <p>{hotel.email || "-"}</p>
            <p>{hotel.officialSite || "-"}</p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="font-semibold text-slate-800 mb-2">Description</h2>
        <p className="text-sm text-slate-600">{hotel.shortDescription || "-"}</p>
      </div>

      {/* AMENITIES */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="font-semibold text-slate-800 mb-2">
          Amenities ({hotel.amenities.length})
        </h2>
        <div className="flex flex-wrap gap-1">
          {hotel.amenities.map((item) => (
            <span
              key={item.amenityId}
              className="bg-slate-100 px-2 py-1 rounded text-sm"
            >
              {item.amenity.name}
            </span>
          ))}
        </div>
      </div>

      {/* PROVIDERS + ATTRACTIONS - 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="font-semibold text-slate-800 mb-2">Providers</h2>
          {hotel.providers.length === 0 ? (
            <p className="text-sm text-slate-400">No providers</p>
          ) : (
            <div className="space-y-1">
              {hotel.providers.map((p) => (
                <div key={p.id} className="flex justify-between text-sm">
                  <span>{p.provider.name}</span>
                  <span className="font-medium">
                    {p.price
                      ? `Rp ${p.price.toLocaleString("id-ID")}`
                      : "-"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-slate-800">Attractions</h2>
            <Link
              href={`/admin/hotels/${hotel.id}/attractions`}
              className="text-sm text-blue-600 hover:underline"
            >
              Manage
            </Link>
          </div>
          {hotel.attractions.length === 0 ? (
            <p className="text-sm text-slate-400">No attractions</p>
          ) : (
            <div className="space-y-1">
              {hotel.attractions.map((item) => (
                <div key={item.attractionId} className="flex justify-between text-sm">
                  <span>{item.attraction.name}</span>
                  <span className="text-slate-500">
                    {item.distanceKm ? `${item.distanceKm}km` : "-"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}