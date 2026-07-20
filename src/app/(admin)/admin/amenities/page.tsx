import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function AmenitiesPage() {
  const categories = await prisma.amenityCategory.findMany({
    orderBy: {
      sortOrder: "asc",
    },

    include: {
      amenities: {
        orderBy: {
          name: "asc",
        },

        include: {
          _count: {
            select: {
              hotels: true,
            },
          },
        },
      },
    },
  })

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Amenities
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage hotel amenities & categories
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/amenity-categories"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Categories
          </Link>

          <Link
            href="/admin/amenities/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Amenity
          </Link>
        </div>
      </div>

      {/* EMPTY */}
      {categories.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            No amenities found
          </p>
        </div>
      )}

      {/* CATEGORY SECTIONS */}
      <div className="space-y-8">
        {categories.map((category) => (
          <section
            key={category.id}
            className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
          >
            {/* CATEGORY HEADER */}
            <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-slate-800">
                    {category.name}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {category.amenities.length} amenities
                  </p>
                </div>

                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                  {category.slug}
                </span>
              </div>
            </div>

            {/* AMENITIES GRID */}
            {category.amenities.length === 0 ? (
              <div className="p-6 text-sm text-slate-400">
                No amenities in this category
              </div>
            ) : (
              <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
                {category.amenities.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate font-medium text-slate-800">
                            {item.name}
                          </h3>

                          {item.isPopular && (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                              Popular
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {item.slug}
                        </p>
                      </div>

                      <Link
                        href={`/admin/amenities/${item.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </Link>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600">
                          icon: {item.icon || "-"}
                        </span>
                      </div>

                      <span className="text-slate-500">
                        {item._count.hotels} hotels
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

