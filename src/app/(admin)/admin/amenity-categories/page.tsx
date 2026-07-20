import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Page() {
  const categories = await prisma.amenityCategory.findMany({
    orderBy: { sortOrder: "asc" },
  })

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Amenity Categories</h1>
          <p className="text-sm text-slate-500 mt-1">{categories.length} kategori</p>
        </div>

        <Link
          href="/admin/amenity-categories/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Tambah
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Nama</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Slug</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Sort</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((item) => (
              <tr key={item.id} className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3 text-slate-500">{item.slug}</td>
                <td className="px-4 py-3">{item.sortOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}