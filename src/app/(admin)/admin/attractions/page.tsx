import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function AttractionsPage() {
  const attractions = await prisma.attraction.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      city: {
        include: {
          state: true,
        },
      },
      _count: { select: { hotels: true } },
    },
  })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Attractions</h1>
          <p className="text-sm text-slate-500 mt-1">Manage tourist attractions</p>
        </div>
        <Link href="/admin/attractions/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          + Add Attraction
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-500">Name</th>
              <th className="text-left px-4 py-3 font-medium text-slate-500">Location</th>
              <th className="text-left px-4 py-3 font-medium text-slate-500">Slug</th>
              <th className="text-center px-4 py-3 font-medium text-slate-500">Hotels</th>
              <th className="text-right px-4 py-3 font-medium text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {attractions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-slate-400">
                  No attractions found
                </td>
              </tr>
            ) : (
              attractions.map((item) => (
                <tr key={item.id} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {item.city?.name ?? "-"}, {item.city?.state?.name ?? ""}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{item.slug}</td>
                  <td className="px-4 py-3 text-center">{item._count.hotels}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/attractions/${item.id}/edit`} className="text-blue-600 hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}