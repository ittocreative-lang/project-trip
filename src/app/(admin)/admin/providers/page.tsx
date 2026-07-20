import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function ProvidersPage() {
  const providers = await prisma.provider.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Providers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            OTA & Affiliate Providers
          </p>
        </div>

        <Link
          href="/admin/providers/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
        >
          + Add Provider
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm">
                Name
              </th>

              <th className="px-4 py-3 text-left text-sm">
                Slug
              </th>

              <th className="px-4 py-3 text-left text-sm">
                Logo
              </th>

              <th className="px-4 py-3 text-right text-sm">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {providers.map((provider) => (
              <tr
                key={provider.id}
                className="border-t"
              >
                <td className="px-4 py-3">
                  {provider.name}
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {provider.slug}
                </td>

                <td className="px-4 py-3">
                  {provider.logo ? (
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      className="h-8"
                    />
                  ) : (
                    "-"
                  )}
                </td>

                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/providers/${provider.id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}