import { prisma } from "@/lib/prisma"

export async function getHotelBySlug(
  slug: string
) {
  return prisma.hotel.findUnique({
    where: {
      slug,
      status: "PUBLISHED",
    },

    include: {
      city: {
        include: {
          state: {
            include: {
              country: true,
            },
          },
        },
      },

      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },

      amenities: {
        include: {
          amenity: {
            include: {
              category: true,
            },
          },
        },
      },

      providers: {
        include: {
          provider: true,
        },
      },

      attractions: {
        include: {
          attraction: true,
        },
      },

      reviews: {
        include: {
          user: true,
        },

        take: 10,

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })
}