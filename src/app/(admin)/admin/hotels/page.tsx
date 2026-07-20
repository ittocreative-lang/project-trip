import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { ROLES } from "@/lib/role"
import Link from "next/link"
import { Star } from "lucide-react"
import DeleteHotelButton from "@/components/admin/DeleteHotelButton"

export default async function AdminHotelsPage() {
const session = await getServerSession(authOptions)
const role = session?.user?.role ?? 0

const hotels = await prisma.hotel.findMany({
  where:
    role >= ROLES.ADMIN
      ? {}
      : {
          createdById: session?.user?.id,
        },

  orderBy: {
    createdAt: "desc",
  },

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
    _count: {
      select: {
        reviews: true,
      },
    },
  },
})

async function updateStatus(
id: string,
status: "PUBLISHED" | "ARCHIVED"
) {
"use server"


const session = await getServerSession(authOptions)

const role = session?.user?.role ?? 0

if (role < ROLES.ADMIN) {
  throw new Error("Unauthorized")
}

await prisma.hotel.update({
  where: {
    id,
  },
  data: {
    status,
  },
})


}

return ( <div className="p-6"> <div className="mb-6 flex items-center justify-between"> <div> <h1 className="text-2xl font-bold text-slate-800">
Hotels </h1>


      <p className="mt-1 text-sm text-slate-500">
        {hotels.length} hotel terdaftar
      </p>
    </div>

    <Link
      href="/admin/hotels/new"
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      + Tambah Hotel
    </Link>
  </div>

  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
    <table className="w-full text-sm">
      <thead className="border-b border-slate-200 bg-slate-50">
        <tr>
          <th className="px-4 py-3 text-left font-medium text-slate-600">
            Nama Hotel
          </th>

          <th className="px-4 py-3 text-left font-medium text-slate-600">
            Lokasi
          </th>

          <th className="px-4 py-3 text-left font-medium text-slate-600">
            Status
          </th>

          <th className="px-4 py-3 text-left font-medium text-slate-600">
            Rating
          </th>

          <th className="px-4 py-3 text-left font-medium text-slate-600">
            Ulasan
          </th>

          <th className="px-4 py-3 text-left font-medium text-slate-600">
            Harga
          </th>

          <th className="px-4 py-3" />
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-100">
        {hotels.length === 0 ? (
          <tr>
            <td
              colSpan={7}
              className="py-12 text-center text-slate-400"
            >
              Belum ada hotel.

              <Link
                href="/admin/hotels/new"
                className="ml-1 text-blue-600 hover:underline"
              >
                Tambah sekarang
              </Link>
            </td>
          </tr>
        ) : (
          hotels.map((hotel) => (
            <tr
              key={hotel.id}
              className="hover:bg-slate-50"
            >
              <td className="px-4 py-3">
                <div className="font-medium">
                  {hotel.name}
                </div>
              </td>

              <td className="px-4 py-3 text-slate-600">
                <div>{hotel.city.name}</div>

                <div className="text-xs text-slate-400">
                  {hotel.city.state.name},{" "}
                  {hotel.city.state.country.name}
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="flex flex-col gap-1">
                  <span
                    className={`w-fit rounded-full px-2 py-1 text-xs font-medium ${
                      hotel.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : hotel.status === "DRAFT"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {hotel.status}
                  </span>

                  {hotel.status === "DRAFT" &&
                    role >= ROLES.ADMIN && (
                      <form
                        action={updateStatus.bind(
                          null,
                          hotel.id,
                          "PUBLISHED"
                        )}
                      >
                        <button
                          type="submit"
                          className="text-xs text-green-600 hover:underline"
                        >
                          Approve
                        </button>
                      </form>
                    )}
                </div>
              </td>

              <td className="px-4 py-3">
                <span className="flex items-center gap-1">
                  <Star
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  {hotel.rating.toFixed(1)}
                </span>
              </td>

              <td className="px-4 py-3">
                {hotel._count.reviews}
              </td>

              <td className="px-4 py-3">
                {hotel.priceMin
                  ? `Rp ${hotel.priceMin.toLocaleString(
                      "id-ID"
                    )}`
                  : "-"}
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/hotels/${hotel.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <DeleteHotelButton
                    id={hotel.id}
                    name={hotel.name}
                  />
                </div>
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
