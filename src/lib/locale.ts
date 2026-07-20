import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { currencies } from "@/lib/currencies";

export async function getLocaleSettings() {
  const cookieStore = await cookies();

  const language =
    cookieStore.get("language")?.value ??
    "en";

  const currency =
    cookieStore.get("currency")?.value ??
    "USD";

  const languages =
    await prisma.language.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        nativeName: "asc",
      },
    });

  return {
    language,
    currency,
    languages,
    currencies,
  };
}