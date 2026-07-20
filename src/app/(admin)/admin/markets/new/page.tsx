import { prisma } from "@/lib/prisma";
import MarketForm from "@/components/admin/markets/MarketForm";

export default async function NewMarketPage() {
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
          New Market
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new market.
        </p>
      </div>

      <MarketForm
        countries={countries}
        languages={languages}
      />
    </div>
  );
}