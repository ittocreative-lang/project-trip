import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import LanguageForm from "@/components/admin/languages/LanguageForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditLanguagePage({
  params,
}: Props) {
  const { id } = await params;

  const language = await prisma.language.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!language) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Language
        </h1>

        <p className="mt-1 text-slate-500">
          Update language information.
        </p>
      </div>

      <LanguageForm language={language} />
    </div>
  );
}