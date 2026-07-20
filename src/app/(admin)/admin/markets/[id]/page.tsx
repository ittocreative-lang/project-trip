import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import MarketForm from "@/components/admin/markets/MarketForm";

export default async function EditMarketPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const market = await prisma.market.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!market) {
    notFound();
  }

  const countries = await prisma.country.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const languages = await prisma.language.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      nativeName: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Edit Market
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update market information.
        </p>
      </div>

      <MarketForm
        market={market}
        countries={countries}
        languages={languages}
      />
    </div>
  );
}