import { prisma } from "@/lib/prisma";
import { getCurrentMarket } from "@/lib/market";

import FeaturedCityTabs from "./FeaturedCityTabs";

interface Props {
  locale: string;
}

export default async function FeaturedCitySection({
  locale,
}: Props) {
  const market = await getCurrentMarket();

  if (!market) {
    return null;
  }

  const featuredCities =
    await prisma.featuredCity.findMany({
      where: {
        marketId: market.id,
      },
      orderBy: {
        sortOrder: "asc",
      },
      include: {
        city: {
          include: {
            hotels: {
              where: {
                status: "PUBLISHED",
              },
              orderBy: [
                {
                  isFeatured: "desc",
                },
                {
                  createdAt: "desc",
                },
              ],
              take: 8,
              include: {
                images: {
                  where: {
                    isFeatured: true,
                  },
                  take: 1,
                },
                providers: {
                  include: {
                    provider: true,
                  },
                },
              },
            },
          },
        },
      },
    });

  if (!featuredCities.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Explore Hotels
        </h2>

        <p className="mt-2 text-slate-500">
          Discover the most popular hotels from top destinations.
        </p>
      </div>

      <FeaturedCityTabs
        locale={locale}
        cities={featuredCities}
      />
    </section>
  );
}