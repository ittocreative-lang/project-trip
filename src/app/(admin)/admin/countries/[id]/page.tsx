import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import CountryForm from "@/components/admin/countries/CountryForm";

export default async function EditCountryPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

const country =
  await prisma.country.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      isoCode: true,
      locale: true,
      language: true,
      currency: true,
      isActive: true,
      isDefault: true,
    },
  });

  if (!country) {
    notFound();
  }

  const languages =
    await prisma.language.findMany({
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
          Edit Country
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update country information.
        </p>
      </div>

      <CountryForm
        country={country}
        languages={languages}
      />
    </div>
  );
}