import { prisma } from "@/lib/prisma"

export async function getLatestHotels() {
  return prisma.hotel.findMany({
    where: {
      status: "PUBLISHED",
    },

    include: {
      city: true,
      images: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 8,
  })
}