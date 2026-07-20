import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

export async function getCurrentMarket() {
  const cookieStore = await cookies();

  const code =
    cookieStore.get("market")?.value ??
    "global";

  const market =
    await prisma.market.findUnique({
      where: {
        code,
      },
      include: {
        defaultLanguage: true,
      },
    });

  if (market) {
    return market;
  }

  return prisma.market.findFirst({
    where: {
      isDefault: true,
    },
    include: {
      defaultLanguage: true,
    },
  });
}