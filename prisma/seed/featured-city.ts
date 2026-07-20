import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const featuredMap: Record<string, string[]> = {
  ID: [
    "Bali",
    "Jakarta",
    "Bandung",
    "Yogyakarta",
    "Surabaya",
    "Lombok",
    "Labuan Bajo",
    "Medan",
  ],

  JP: [
    "Tokyo",
    "Osaka",
    "Kyoto",
    "Sapporo",
    "Fukuoka",
  ],

  SG: [
    "Singapore",
  ],

  TH: [
    "Bangkok",
    "Phuket",
    "Chiang Mai",
    "Pattaya",
  ],

  MY: [
    "Kuala Lumpur",
    "Penang",
    "Langkawi",
    "Johor Bahru",
  ],

  US: [
    "New York",
    "Los Angeles",
    "Las Vegas",
    "Miami",
    "Chicago",
  ],

  FR: [
    "Paris",
    "Nice",
    "Lyon",
  ],

  IT: [
    "Rome",
    "Milan",
    "Venice",
  ],

  GB: [
    "London",
    "Manchester",
    "Edinburgh",
  ],
};

async function main() {
  const marketCountries = await prisma.marketCountry.findMany({
    include: {
      market: true,
      country: true,
    },
  });

  for (const item of marketCountries) {
    const cityNames = featuredMap[item.country.isoCode] ?? [];

    for (let i = 0; i < cityNames.length; i++) {
      const city = await prisma.city.findFirst({
        where: {
          name: cityNames[i],
          state: {
            countryId: item.countryId,
          },
        },
      });

      if (!city) continue;

      await prisma.featuredCity.upsert({
        where: {
          marketId_cityId: {
            marketId: item.marketId,
            cityId: city.id,
          },
        },
        update: {
          sortOrder: i + 1,
        },
        create: {
          marketId: item.marketId,
          cityId: city.id,
          sortOrder: i + 1,
        },
      });
    }

    console.log(`✓ ${item.market.name}`);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });