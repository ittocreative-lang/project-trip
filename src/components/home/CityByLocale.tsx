import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function CityByLocale() {
  const cities = await prisma.city.findMany({
    take: 12,
    include: { state: true }
  })

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-2xl font-bold mb-6">
          Explore Cities
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/city/${city.slug}`}
              className="p-4 border rounded-xl bg-white hover:shadow"
            >
              <p className="font-semibold">{city.name}</p>
              <p className="text-sm text-gray-500">
                {city.state.name}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}