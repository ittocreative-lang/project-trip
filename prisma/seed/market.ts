import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const languages = await prisma.language.findMany();

  const getLanguage = (code: string) => {
    const language = languages.find((l) => l.code === code);

    if (!language) {
      throw new Error(`Language ${code} not found`);
    }

    return language.id;
  };

  await prisma.market.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Global",
        code: "global",
        defaultLanguageId: getLanguage("en"),
        defaultCurrency: "USD",
        isDefault: true,
      },
      {
        name: "Indonesia",
        code: "id",
        defaultLanguageId: getLanguage("id"),
        defaultCurrency: "IDR",
      },
      {
        name: "Malaysia",
        code: "my",
        defaultLanguageId: getLanguage("ms"),
        defaultCurrency: "MYR",
      },
      {
        name: "Singapore",
        code: "sg",
        defaultLanguageId: getLanguage("en"),
        defaultCurrency: "SGD",
      },
      {
        name: "Thailand",
        code: "th",
        defaultLanguageId: getLanguage("th"),
        defaultCurrency: "THB",
      },
      {
        name: "Vietnam",
        code: "vn",
        defaultLanguageId: getLanguage("vi"),
        defaultCurrency: "VND",
      },
      {
        name: "Japan",
        code: "jp",
        defaultLanguageId: getLanguage("ja"),
        defaultCurrency: "JPY",
      },
      {
        name: "South Korea",
        code: "kr",
        defaultLanguageId: getLanguage("ko"),
        defaultCurrency: "KRW",
      },
      {
        name: "United States",
        code: "us",
        defaultLanguageId: getLanguage("en"),
        defaultCurrency: "USD",
      },
      {
        name: "United Kingdom",
        code: "gb",
        defaultLanguageId: getLanguage("en"),
        defaultCurrency: "GBP",
      },
      {
        name: "Germany",
        code: "de",
        defaultLanguageId: getLanguage("de"),
        defaultCurrency: "EUR",
      },
      {
        name: "France",
        code: "fr",
        defaultLanguageId: getLanguage("fr"),
        defaultCurrency: "EUR",
      },
      {
        name: "Spain",
        code: "es",
        defaultLanguageId: getLanguage("es"),
        defaultCurrency: "EUR",
      },
      {
        name: "Italy",
        code: "it",
        defaultLanguageId: getLanguage("it"),
        defaultCurrency: "EUR",
      },
      {
        name: "Australia",
        code: "au",
        defaultLanguageId: getLanguage("en"),
        defaultCurrency: "AUD",
      },
    ],
  });

  console.log("✅ Markets seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });