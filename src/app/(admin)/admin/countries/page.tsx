import Link from "next/link";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function AdminCountriesPage() {
  const countries = await prisma.country.findMany({
    include: {
      _count: {
        select: {
          states: true,
          articles: true,
          marketCountries: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Countries
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage countries used by markets, hotels and articles.
          </p>
        </div>

        <Link
          href="/admin/countries/new"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          New Country
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-700">
              <th className="px-6 py-4">Country</th>
              <th className="px-6 py-4">ISO</th>
              <th className="px-6 py-4">Locale</th>
              <th className="px-6 py-4">Currency</th>
              <th className="px-6 py-4">States</th>
              <th className="px-6 py-4">Markets</th>
              <th className="px-6 py-4">Status</th>
              <th className="w-32 px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {countries.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No countries found.
                </td>
              </tr>
            )}

            {countries.map((country) => (
              <tr
                key={country.id}
                className="border-t border-slate-100"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">
                    {country.name}
                  </div>

                  {country.isDefault && (
                    <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      Default
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {country.isoCode}
                </td>

                <td className="px-6 py-4">
                  {country.locale ?? "-"}
                </td>

                <td className="px-6 py-4">
                  {country.currency ?? "-"}
                </td>

                <td className="px-6 py-4">
                  {country._count.states}
                </td>

                <td className="px-6 py-4">
                  {country._count.marketCountries}
                </td>

                <td className="px-6 py-4">
                  {country.isActive ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      Disabled
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/countries/${country.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/admin/states?country=${country.id}`}
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                    >
                      States
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}