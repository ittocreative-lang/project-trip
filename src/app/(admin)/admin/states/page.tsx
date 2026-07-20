import Link from "next/link";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function AdminStatesPage() {
  const states = await prisma.state.findMany({
    include: {
      country: true,
      _count: {
        select: {
          cities: true,
        },
      },
    },
    orderBy: [
      {
        country: {
          name: "asc",
        },
      },
      {
        name: "asc",
      },
    ],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            States
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage states and provinces.
          </p>
        </div>

        <Link
          href="/admin/states/new"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          New State
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-700">
              <th className="px-6 py-4">Country</th>
              <th className="px-6 py-4">State</th>
              <th className="px-6 py-4">ISO</th>
              <th className="px-6 py-4">Cities</th>
              <th className="w-32 px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {states.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No states found.
                </td>
              </tr>
            )}

            {states.map((state) => (
              <tr
                key={state.id}
                className="border-t border-slate-100"
              >
                <td className="px-6 py-4">
                  {state.country.name}
                </td>

                <td className="px-6 py-4 font-medium">
                  {state.name}
                </td>

                <td className="px-6 py-4">
                  {state.isoCode}
                </td>

                <td className="px-6 py-4">
                  {state._count.cities}
                </td>

                <td className="px-6 py-4">
                  <Link
                    href={`/admin/states/${state.id}`}
                    className="text-blue-600 hover:text-blue-700"
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
  );
}