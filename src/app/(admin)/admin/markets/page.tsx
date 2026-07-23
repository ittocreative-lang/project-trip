import Link from "next/link";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function AdminMarketsPage() {
  const markets = await prisma.market.findMany({
    include: {
      defaultLanguage: true,

      countries: {
        include: {
          country: true,
        },
      },

      languages: {
        include: {
          language: true,
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
            Markets
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage markets, countries, languages and featured cities.
          </p>
        </div>

        <Link
          href="/admin/markets/new"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          New Market
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-700">
              <th className="px-6 py-4">
                Market
              </th>

              <th className="px-6 py-4">
                Countries
              </th>

              <th className="px-6 py-4">
                Languages
              </th>

              <th className="px-6 py-4">
                Default
              </th>

              <th className="px-6 py-4">
                Currency
              </th>

              <th className="px-6 py-4">
                Domain
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="w-64 px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {markets.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No markets found.
                </td>
              </tr>
            )}

            {markets.map((market) => (
              <tr
                key={market.id}
                className="border-t border-slate-100"
              >
                {/* Market */}
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">
                    {market.name}
                  </div>

                  <div className="text-xs text-slate-500">
                    {market.code}
                  </div>
                </td>

                {/* Countries */}
                <td className="px-6 py-4">
                  {market.countries.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {market.countries.map((item) => (
                        <span
                          key={item.countryId}
                          className="rounded-full bg-slate-100 px-2 py-1 text-xs"
                        >
                          {item.country.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400">
                      No countries
                    </span>
                  )}
                </td>

                {/* Languages */}
                <td className="px-6 py-4">
                  {market.languages.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {market.languages.map((item) => (
                        <span
                          key={item.languageId}
                          className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700"
                        >
                          {item.language.nativeName}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400">
                      No languages
                    </span>
                  )}
                </td>

                {/* Default Language */}
                <td className="px-6 py-4">
                  {market.defaultLanguage.nativeName}
                </td>

                {/* Currency */}
                <td className="px-6 py-4">
                  {market.defaultCurrency}
                </td>

                {/* Domain */}
                <td className="px-6 py-4">
                  {market.domain ?? "-"}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {market.isActive ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      Disabled
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <Link
                      href={`/admin/markets/${market.id}`}
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/admin/markets/${market.id}/countries`}
                      className="font-medium text-emerald-600 hover:text-emerald-700"
                    >
                      Countries
                    </Link>

                    <Link
                      href={`/admin/markets/${market.id}/languages`}
                      className="font-medium text-orange-600 hover:text-orange-700"
                    >
                      Languages
                    </Link>

                    <Link
                      href={`/admin/markets/${market.id}/featured-cities`}
                      className="font-medium text-purple-600 hover:text-purple-700"
                    >
                      Cities
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