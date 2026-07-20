import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function AdminLocationsPage() {
  const countries = await prisma.country.findMany({
    orderBy: { name: "asc" },
    include: {
      states: {
        take: 5,
        orderBy: { name: "asc" },
        include: { _count: { select: { cities: true } } },
      },
      _count: { select: { states: true } },
    },
  })

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Locations</h1>
          <p className="mt-1 text-sm text-slate-500">Manage countries, states & cities</p>
        </div>

        <Link
          href="/admin/locations/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add Location
        </Link>
      </div>

      <div className="space-y-4">
        {countries.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-sm text-slate-400">No locations yet</p>
          </div>
        ) : (
          countries.map((country) => (
            <div key={country.id} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-slate-800">{country.name}</h2>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                      {country.isoCode}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{country._count.states} states</p>
                </div>

                <Link
                  href={`/admin/locations/${country.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Manage
                </Link>
              </div>

              {country.states.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {country.states.map((state) => (
                    <div key={state.id} className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
                      {state.name}
                      <span className="ml-2 text-xs text-slate-400">({state._count.cities} cities)</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}