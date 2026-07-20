import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { getLocale } from "next-intl/server"

export default async function LatestHotels() {
  const locale = await getLocale()

  const hotels = await prisma.hotel.findMany({
    where: { status: "PUBLISHED" },
    take: 8,
    include: {
      images: true,
      city: true
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <h2 className="text-2xl font-bold mb-6">
        Latest Hotels
      </h2>

      <div className="grid md:grid-cols-4 gap-4">
        {hotels.map((hotel) => (
          <Link
            key={hotel.id}
            href={`/${locale}/hotels/${hotel.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow"
          >
            <img
              src={hotel.images?.[0]?.url || "/placeholder.jpg"}
              className="h-36 w-full object-cover"
              alt={hotel.name}
            />

            <div className="p-3">
              <p className="font-medium">{hotel.name}</p>
              <p className="text-xs text-gray-500">
                {hotel.city.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}