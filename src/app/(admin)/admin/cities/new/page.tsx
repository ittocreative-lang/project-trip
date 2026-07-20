import { prisma } from "@/lib/prisma";

import CityForm from "@/components/admin/cities/CityForm";

export default async function NewCityPage() {
  const countries = await prisma.country.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const states = await prisma.state.findMany({
    include: {
      country: true,
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
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          New City
        </h1>

        <p className="mt-1 text-slate-500">
          Create a new city.
        </p>
      </div>

      <CityForm
        countries={countries}
        states={states}
      />
    </div>
  );
}