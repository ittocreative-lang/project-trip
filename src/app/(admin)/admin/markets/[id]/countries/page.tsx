import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import MarketCountriesForm from "@/components/admin/markets/MarketCountriesForm";

export default async function MarketCountriesPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const marketId = Number(id);

  if (Number.isNaN(marketId)) {
    notFound();
  }

  const market = await prisma.market.findUnique({
    where: {
      id: marketId,
    },
    include: {
      countries: true,
    },
  });

  if (!market) {
    notFound();
  }

  const countries = await prisma.country.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const selectedCountryIds = market.countries.map(
    (item) => item.countryId
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Market Countries
        </h1>

        <p className="mt-1 text-slate-500">
          Select which countries belong to{" "}
          <span className="font-semibold">
            {market.name}
          </span>
        </p>
      </div>

      <MarketCountriesForm
        marketId={market.id}
        countries={countries}
        selectedCountryIds={selectedCountryIds}
      />
    </div>
  );
}