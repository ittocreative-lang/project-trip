import Link from "next/link";

import { prisma } from "@/lib/prisma";
import CityTable from "@/components/admin/cities/CityTable";

export default async function CitiesPage() {
  const cities = await prisma.city.findMany({
    include: {
      state: {
        include: {
          country: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Cities
          </h1>

          <p className="mt-1 text-slate-500">
            Manage cities.
          </p>
        </div>

        <Link
          href="/admin/cities/new"
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + New City
        </Link>
      </div>

      <CityTable cities={cities} />
    </div>
  );
}