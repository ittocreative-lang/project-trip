import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import StateForm from "@/components/admin/states/StateForm";

export default async function EditStatePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const state =
    await prisma.state.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!state) {
    notFound();
  }

  const countries =
    await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Edit State
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update state.
        </p>
      </div>

      <StateForm
        state={state}
        countries={countries}
      />
    </div>
  );
}