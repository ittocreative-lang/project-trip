import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const countries = [
    {
      name: "Indonesia",
      isoCode: "ID",
      locale: "id-ID",
      language: "id",
      currency: "IDR",
      isDefault: true,
    },
    {
      name: "Singapore",
      isoCode: "SG",
      locale: "en-SG",
      language: "en",
      currency: "SGD",
    },
    {
      name: "Malaysia",
      isoCode: "MY",
      locale: "en-MY",
      language: "en",
      currency: "MYR",
    },
    {
      name: "Thailand",
      isoCode: "TH",
      locale: "en-TH",
      language: "th",
      currency: "THB",
    },
    {
      name: "Vietnam",
      isoCode: "VN",
      locale: "vi-VN",
      language: "vi",
      currency: "VND",
    },
    {
      name: "Philippines",
      isoCode: "PH",
      locale: "en-PH",
      language: "en",
      currency: "PHP",
    },
    {
      name: "Japan",
      isoCode: "JP",
      locale: "ja-JP",
      language: "ja",
      currency: "JPY",
    },
    {
      name: "South Korea",
      isoCode: "KR",
      locale: "ko-KR",
      language: "ko",
      currency: "KRW",
    },
    {
      name: "China",
      isoCode: "CN",
      locale: "zh-CN",
      language: "zh",
      currency: "CNY",
    },
    {
      name: "Hong Kong",
      isoCode: "HK",
      locale: "zh-HK",
      language: "zh",
      currency: "HKD",
    },
    {
      name: "Taiwan",
      isoCode: "TW",
      locale: "zh-TW",
      language: "zh",
      currency: "TWD",
    },
    {
      name: "India",
      isoCode: "IN",
      locale: "en-IN",
      language: "en",
      currency: "INR",
    },
    {
      name: "Australia",
      isoCode: "AU",
      locale: "en-AU",
      language: "en",
      currency: "AUD",
    },
    {
      name: "New Zealand",
      isoCode: "NZ",
      locale: "en-NZ",
      language: "en",
      currency: "NZD",
    },
    {
      name: "United States",
      isoCode: "US",
      locale: "en-US",
      language: "en",
      currency: "USD",
    },
    {
      name: "Canada",
      isoCode: "CA",
      locale: "en-CA",
      language: "en",
      currency: "CAD",
    },
    {
      name: "United Kingdom",
      isoCode: "GB",
      locale: "en-GB",
      language: "en",
      currency: "GBP",
    },
    {
      name: "France",
      isoCode: "FR",
      locale: "fr-FR",
      language: "fr",
      currency: "EUR",
    },
    {
      name: "Germany",
      isoCode: "DE",
      locale: "de-DE",
      language: "de",
      currency: "EUR",
    },
    {
      name: "Italy",
      isoCode: "IT",
      locale: "it-IT",
      language: "it",
      currency: "EUR",
    },
    {
      name: "Spain",
      isoCode: "ES",
      locale: "es-ES",
      language: "es",
      currency: "EUR",
    },
    {
      name: "Netherlands",
      isoCode: "NL",
      locale: "nl-NL",
      language: "nl",
      currency: "EUR",
    },
    {
      name: "Switzerland",
      isoCode: "CH",
      locale: "de-CH",
      language: "de",
      currency: "CHF",
    },
    {
      name: "United Arab Emirates",
      isoCode: "AE",
      locale: "en-AE",
      language: "en",
      currency: "AED",
    },
    {
      name: "Saudi Arabia",
      isoCode: "SA",
      locale: "ar-SA",
      language: "ar",
      currency: "SAR",
    },
    {
      name: "Turkey",
      isoCode: "TR",
      locale: "tr-TR",
      language: "tr",
      currency: "TRY",
    },
    {
      name: "Brazil",
      isoCode: "BR",
      locale: "pt-BR",
      language: "pt",
      currency: "BRL",
    },
    {
      name: "Mexico",
      isoCode: "MX",
      locale: "es-MX",
      language: "es",
      currency: "MXN",
    },
    {
      name: "South Africa",
      isoCode: "ZA",
      locale: "en-ZA",
      language: "en",
      currency: "ZAR",
    },
  ];

  for (const country of countries) {
    await prisma.country.upsert({
      where: {
        isoCode: country.isoCode,
      },
      update: country,
      create: country,
    });
  }

  console.log(`✅ Seeded ${countries.length} countries`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });