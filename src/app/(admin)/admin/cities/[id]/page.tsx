import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import CityForm from "@/components/admin/cities/CityForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCityPage({
  params,
}: Props) {
  const { id } = await params;

  const city = await prisma.city.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!city) {
    notFound();
  }

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
          Edit City
        </h1>

        <p className="mt-1 text-slate-500">
          Update city information.
        </p>
      </div>

      <CityForm
        city={city}
        countries={countries}
        states={states}
      />
    </div>
  );
}