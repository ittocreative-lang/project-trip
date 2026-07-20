import { prisma } from "@/lib/prisma";
import StateForm from "@/components/admin/states/StateForm";

export default async function NewStatePage() {
  const countries = await prisma.country.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          New State
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new state.
        </p>
      </div>

      <StateForm
        countries={countries}
      />
    </div>
  );
}