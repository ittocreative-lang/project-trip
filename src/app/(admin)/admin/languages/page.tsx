import Link from "next/link";
import { prisma } from "@/lib/prisma";
import LanguageTable from "@/components/admin/languages/LanguageTable";

export default async function LanguagesPage() {
  const languages = await prisma.language.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Languages
          </h1>

          <p className="mt-1 text-slate-500">
            Manage available website languages.
          </p>
        </div>

        <Link
          href="/admin/languages/new"
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + New Language
        </Link>
      </div>

      <LanguageTable languages={languages} />
    </div>
  );
}