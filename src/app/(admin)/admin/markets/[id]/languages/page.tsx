import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import MarketLanguagesForm from "@/components/admin/markets/MarketLanguagesForm";

export default async function MarketLanguagesPage({
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
    include: {
      languages: true,
    },
  });

  if (!market) {
    notFound();
  }

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
          Market Languages
        </h1>

        <p className="text-sm text-slate-500">
          Select languages available for this market.
        </p>
      </div>

      <MarketLanguagesForm
        marketId={market.id}
        languages={languages}
        selectedLanguageIds={market.languages.map(
          (item) => item.languageId
        )}
      />
    </div>
  );
}