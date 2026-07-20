import { prisma } from "@/lib/prisma";

export async function getLanguages() {
  return prisma.language.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      nativeName: "asc",
    },
  });
}